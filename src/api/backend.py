import os
import json
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = os.path.join('public', 'assets')  
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
DATA_FILE = os.path.join('src', 'api', 'data.json')


ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

class Pet:
    def __init__(self, id, name, description, age, price, image):
        self.id = id
        self.name = name
        self.description = description
        self.age = age
        self.price = price
        self.image = image

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'age': self.age,
            'price': self.price,
            'image': self.image
        }

def load_data():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as file:
            return json.load(file) 
    return []

def sort_data(data, sort_option):
    sort_option = sort_option.replace(" ", "").lower()  # Видаляємо пробіли і переводимо в нижній регістр
    if sort_option == "age(low-high)":
        sorted_data = sorted(data, key=lambda pet: pet['age'])
    elif sort_option == "age(high-low)":
        sorted_data = sorted(data, key=lambda pet: pet['age'], reverse=True)
    elif sort_option == "price(low-high)":
        sorted_data = sorted(data, key=lambda pet: pet['price'])
    elif sort_option == "price(high-low)":
        sorted_data = sorted(data, key=lambda pet: pet['price'], reverse=True)
    elif sort_option == "name(a-z)":
        sorted_data = sorted(data, key=lambda pet: pet['name'].lower())
    elif sort_option == "name(z-a)":
        sorted_data = sorted(data, key=lambda pet: pet['name'].lower(), reverse=True)
    else:
        sorted_data = data  # Default: return the data unchanged
   
    return sorted_data




def save_data(data):
    with open(DATA_FILE, 'w') as file:
        json.dump([pet.to_dict() for pet in data], file, indent=4)


data = [Pet(**pet_data) for pet_data in load_data()]

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def home():
    return "Welcome to the CRUD API!"


@app.route('/assets/<path:filename>')
def serve_assets(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


@app.route('/search_and_sort', methods=['GET'])
def search_and_sort_items():
    search_term = request.args.get('search_term', '').lower().replace(' ', '')
    sort_option = request.args.get('sort_option', 'name (A-Z)')
    
    min_age = float(request.args.get('min_age', '0'))
    max_age = float(request.args.get('max_age', '100'))
    min_price = float(request.args.get('min_price', '0'))
    max_price = float(request.args.get('max_price', '10000'))
    
    data_dict = load_data()  

    # Фільтрація за пошуком та діапазонами
    filtered_data = [
        pet for pet in data_dict
        if (search_term in pet['name'].lower().replace(' ', '')) and
           (min_age <= pet['age'] <= max_age) and
           (min_price <= pet['price'] <= max_price)
    ]

    # Сортування
    sorted_data = sort_data(filtered_data, sort_option)
    
    return jsonify(sorted_data)



@app.route('/count_price', methods=['POST'])
def count_price():
    search_query = request.json.get('query', '').lower().replace(' ', '')
    data = load_data()
    filtered_data = [pet for pet in data if search_query in pet['name'].lower().replace(' ', '')]
    total_price = sum(pet['price'] for pet in filtered_data)
    return jsonify({'total': total_price})


@app.route('/items', methods=['POST'])
def create_item():
    if 'image' not in request.files:
        return jsonify({'error': 'No image part in the request'}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        
        # Зберігаємо файл в public/assets
        file.save(file_path)
        
        # Створюємо URL для доступу до файлу
        file_url = f'/assets/{filename}'

        new_item_data = request.form.to_dict()
        new_pet = Pet(
            id=len(data) + 1,
            name=new_item_data['name'],
            description=new_item_data['description'],
            age=float(new_item_data['age']),
            price=float(new_item_data['price']),
            image=file_url
        )
        data.append(new_pet)
        save_data(data)
        return jsonify(new_pet.to_dict()), 201
    else:
        return jsonify({'error': 'File type not allowed'}), 400


@app.route('/items', methods=['GET'])
def get_items():
    offset = int(request.args.get('offset', 0))
    limit = int(request.args.get('limit', 10))
    data_dict = load_data()
    paginated_data = data_dict[offset:offset + limit]
    return jsonify(paginated_data), 200

@app.route('/sort', methods=['POST'])
def sort_items():
    sort_option = request.json.get('sort')  
    data_dict = load_data()  
    sorted_data_dict = sort_data(data_dict, sort_option)  
    sorted_data = [Pet(**pet_dict) for pet_dict in sorted_data_dict]  
    save_data(sorted_data)
    return jsonify([pet.to_dict() for pet in sorted_data])  



@app.route('/items/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    item = next((pet for pet in data if pet.id == item_id), None)
    if item:
        updated_data = request.form.to_dict()
        if 'image' in request.files:
            file = request.files['image']
            if file.filename != '' and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                file.save(file_path)
                file_url = f'/assets/{filename}'
                item.image = file_url

        item.name = updated_data.get('name', item.name)
        item.description = updated_data.get('description', item.description)
        item.age = float(updated_data.get('age', item.age))
        item.price = float(updated_data.get('price', item.price))

        sort_option = request.form.get('sort', 'name (A-Z)')  
        sorted_data_dict = sort_data([pet.to_dict() for pet in data], sort_option)  
        sorted_data = [Pet(**pet_dict) for pet_dict in sorted_data_dict] 
        save_data(sorted_data)  
        return jsonify(item.to_dict()), 200
        
    else:
        return jsonify({'error': 'Item not found'}), 404

@app.route('/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    global data
    data = [pet for pet in data if pet.id != item_id]
    save_data(data)  # Зберегти дані у файл JSON
    return jsonify({'message': 'Item deleted'}), 200

if __name__ == '__main__':
    app.run(debug=True)
    