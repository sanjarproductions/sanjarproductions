# Sanjar Productions

This is a Next.js application that uses the Notion API to display blog posts.

## Setup Instructions

### 1. Notion API Setup

1. **Create a Notion Integration**:
   - Go to [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
   - Click "New integration"
   - Give it a name (e.g., "Sanjar Blog")
   - Select the workspace where your database is located
   - Click "Submit"
   - Copy the "Internal Integration Token" (it starts with `secret_`)

2. **Get Your Database ID**:
   - Open your Notion database in a browser
   - Look at the URL, which will be in this format:
     ```
     https://www.notion.so/workspace/[database-id]?v=[view-id]
     ```
     or
     ```
     https://www.notion.so/[database-id]?v=[view-id]
     ```
   - The database ID is the part between the last `/` and the `?` in the URL
   - It's a 32-character string with hyphens (e.g., `d6cc892e-90da-4be3-ad8e-b1bcc363ce75`)

3. **Share Your Database with the Integration**:
   - Open your Notion database
   - Click the "..." menu in the top-right corner
   - Select "Add connections"
   - Find and select your integration
   - Click "Confirm" to give your integration access to the database

4. **Update Environment Variables**:
   - Create or edit the `.env.local` file in the root directory
   - Add the following:
     ```
     SECRET=secret_your_actual_token_here
     DATABASE_ID=your-database-id-with-hyphens
     ```

### 2. Database Structure Requirements

Your Notion database should have the following properties:

- `Title` (title type) - The title of the post
- `Date` (date type) - The publication date
- `Tags` (multi-select type) - Categories or tags for the post
- `Content` (rich text type) - The main content of the post
- `Description` (rich text type) - A short description for the post

### 3. Running the Application

1. **Install dependencies**:
   ```
   npm install
   ```

2. **Run the development server**:
   ```
   npm run dev
   ```

3. **Access the application**:
   - Open [http://localhost:3000](http://localhost:3000) in your browser

## Troubleshooting

If you encounter issues:

1. **Check the console logs** for error messages
2. **Verify your Notion API token** is correct and starts with `secret_`
3. **Ensure your database ID** is in the correct format with hyphens
4. **Confirm you've shared the database** with your integration
5. **Verify your database structure** matches the required properties

## License

This project is licensed under the MIT License.
