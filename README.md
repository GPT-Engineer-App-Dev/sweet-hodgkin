# sweet-hodgkin

Implement an internal tool with the following features:

1. Create a form with a file input to allow uploading a CSV file. Use the Chakra UI FormControl, FormLabel, Input, and Button components. 

2. When a file is uploaded, parse the CSV data. Filter the data to only include rows where the "type" column equals "ai_update".

3. Create a select dropdown populated with the unique project IDs extracted from the first part of the "path" column. Use the Chakra UI Select component.

4. When a project ID is selected, display the filtered code edits for that project in a list. For each edit, show:
   - The edit ID 
   - The commit SHA
   - A link to search GitHub for the commit, with the URL format: https://github.com/search?q=commit%3A{COMMIT_SHA}&type=commits
   - The parsed contents of the "tags.output" column. Handle parsing the JSON gracefully if it is not perfectly formatted.

5. Use other Chakra UI components like Box, Heading, List, ListItem, Link to structure and style the UI.

Let me know if you have any other questions!

## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Tech stack

This project is built with REPLACE_WITH_TECH_STACK_SUMMARY.

REPLACE_WITH_TECH_STACK_POINTS

## Setup

```sh
git clone https://github.com/GPT-Engineer-App-Dev/sweet-hodgkin.git
cd sweet-hodgkin
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
