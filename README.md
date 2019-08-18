 React Client App for Movies API Project (https://github.com/Stefavag88/moviesapi)

## Technologies Used

- React 
- React Router
- Ant design UI Library fro React
- React-Int with React Context for Language Management

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### App Flow

1. Movies Grid

Shows all the movies that are appropriately created. This means they have at least one Genre and at Least one Contributor (with his type).
Sorting and filtering is implemented for demonstration purposes.
Deletion of one record at a time. 
Editing has not been implemented due to time limitations.

2. Movie Creation With Multistep Forms

- Step 1: A movie can be added in any of the languages supported. (English, Greek and Spanish)
- Step 2: Genres are added
- Step 3: Contributors with their types are added

The genres and contributors step support selection of existing values only. 


**To add new values you can use the admin controller in MoviesAPI Project through Swagger UI. **
