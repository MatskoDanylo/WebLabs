Лабораторні роботи з дисципліни "Вебтехнології та вебдизайн"

Лабораторна робота №9

Виконав: Мацко Данило Любомирович (ІР-21)

React.js: Connecting to REST API

Description: Finally! Now, you are about to put a final touches on all pages you created - implement interaction with your REST API server.

Requirements: 

    • All of the requirements for previous React.js works should be kept.

    • Code style: 

        ◦ For any http request - use axios library
        ◦ All your API functions should be separated into single file (or folder, if you want) - just like you saw in Live coding for 5 lab with fetch() function

    • Functionality: 

        ◦ On Catalog Page - all items should now be fetched from your backend with GET method (using axios)
        ◦ Search with filters - should also be implemented with GET request (search by text field can be left as it is)
        ◦ Before response from your GET method is received you have to display a Spinner(Loader component) to the user.