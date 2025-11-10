# FAQ Data Structure

## Overview
This directory contains JSON data files that power the dynamic content on the OrdoSaxum website.

## Files

### `faq-data.json`
Contains all FAQ content organized by categories.

#### Structure:
```json
{
  "pageTitle": "Page title",
  "pageSubtitle": "Page subtitle",
  "categories": [
    {
      "id": 1,
      "title": "Category Name",
      "questions": [
        {
          "id": "1.1",
          "question": "Question text",
          "answer": "Answer text"
        }
      ]
    }
  ]
}
```

## Adding New FAQ Content

### To add a new category:
1. Open `faq-data.json`
2. Add a new object to the `categories` array
3. Assign the next sequential `id` number
4. Add questions following the structure above

### To add a new question:
1. Find the appropriate category
2. Add a new object to that category's `questions` array
3. Use the format `{categoryId}.{questionNumber}` for the question id

## Formatting Guidelines

- Use proper JSON syntax (validate at jsonlint.com)
- Use `\n` for line breaks in answers
- Preserve bullet points with `•` character
- Keep questions concise and answers comprehensive
- Use proper grammar and spelling

## Tips

- **Version Control**: Always commit changes with descriptive messages
- **Validation**: Test the JSON file before committing
- **Backup**: Keep backups before major edits
- **Preview**: Check the website to verify changes render correctly

## Translation Ready

This structure is designed to support multi-language content in the future:
```json
{
  "en": { ... English content ... },
  "fr": { ... French content ... }
}
```
