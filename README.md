# Library Management System

# Steps to run this
1. Make sure you local mongodb installed - Up and Running

2. Install Python 3.10 or above

3. Create a virtual environment in backend folder --- python3 -m venv lms_env

4. Activate the environment ---- source lms_env/bin/activate

5. install all packages in requirements.txt use the following command --- pip install -r requirements.txt

6. Run backend(Flask)

7. FLASK_APP=app

8. flask run --debug

9. Once the backend is up and running start Front end (make sure you have react, npm and npx installed)

10. Go to frontend folder

11. Run the following commands:

12. npm install

13. npm start -- This will open the app in browser

14. Load the dummy data by using hitting this URL - http://127.0.0.1:3000/books/init

15. Register and Login

16. Click on search and enter the required book details for getting the search results

17. Add them to cart and Check in for getting the book

18. Go to My Books for seeing which we have checked in

19. For Admin access use the following APIs: http://127.0.0.1:3000/admin
