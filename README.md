
# AiMonk Labs Frontend Coding Assignment Overview

Dynamic Tag Tree web application that facilitates interactive tree data management. Users can modify, collapse, and expand tags. Enhanced with search functionality, dark mode, and efficient data export capabilities. 

## Implemented Features:

- #### Adding a Child Tag:

There's a button labeled “Add Child”.
When clicked, a new smaller tag appears inside the current tag.
If the current tag had data, it gets replaced with this new child tag.

- #### Collapsing Tags:

Next to every tag name, there's a “v” or “>” button.
Clicking it will fold or unfold the tag's details.
When folded, you only see the tag's name.

- #### Exporting the Tree:

I've added a button called “Export”.
Clicking this gives users a text version of the tree's structure.
This version only shows the "name", "children", and "data" of each tag, keeping it clean.

- #### Editing Data:

Each tag in the tree has a "data" string.
This string is shown inside a box where users can type.
Any changes made in this box will change the actual data inside the tree.

- #### Reflecting Changes:

Any changes made to the "data" string will be shown in the exported version.

## Bonus Features:

- #### Renaming Tags:

Users can change any tag's name.
Clicking on the name brings up a box to type a new name.
Once they press the Enter key on their keyboard, the name is updated everywhere.

- #### Search Functionality:

Users can type and search for specific tags based on name or data.
This helps quickly find and navigate to specific tags, especially when the tree is big.

- #### Deleting a Tag:

Next to every tag, there's a 'Delete' button.
Clicking it removes that tag.
If a main tag is removed, all its smaller tags inside it also get removed.

- #### Dark Mode:

For those who prefer darker screens, I've added a switch.
This switch changes the project's theme to darker colors.


## Screenshots

#### Adding Child Tag
![Adding Child Tag](https://i.ibb.co/7C3W22b/1-Adding-a-Child-Tag.png)

#### Collapsing Tags
![Collapsing Tags](https://i.ibb.co/py1FR2J/2-Collapsing-Tags.png)

#### Editing data string and export functionality
![Editing data string and export functionality](https://i.ibb.co/jkCx2V1/3-Editing-data-string-and-export-functionality.png)


#### Renaming tags updated export and delete feature
![Renaming tags updated export and delete feature](https://i.ibb.co/18PjMZr/4-Renaming-tags-updated-export-and-delete-feature.png)


#### Search Functionality and Dark toggle
![Search Functionality and Dark toggle](https://i.ibb.co/dLRgVgP/5-Search-Functionality-and-Dark-toggle.png)