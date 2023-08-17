// Sample tree data
const tree = {
  name: "root",
  children: [],
};

// Update the Export button's link

function updateExport() {
  const exportButton = document.getElementById("export-button");
  const jsonString = JSON.stringify(tree, ["name", "children", "data"], 2);
  exportButton.setAttribute(
    "href",
    `data:text/plain;charset=utf-8,${encodeURIComponent(jsonString)}`
  );
}
// Create a tag element recursively

function createTagElement(tag, parentTag) {
  const tagElement = document.createElement("div");
  tagElement.className = "tag";

  // Create tag header with collapse, add child, and delete buttons

  const tagHeader = document.createElement("div");
  tagHeader.className = "tag-header";
  tagHeader.innerHTML = `
    <span class="collapse-icon">v</span>
    <span class="tag-name">${tag.name}</span>
    <button class="add-child-btn">Add Child</button>
    <button class="delete-btn">Delete</button>
`;
  tagElement.appendChild(tagHeader);

  // Create child tags recursively

  if (tag.children) {
    const childrenContainer = document.createElement("div");
    childrenContainer.className = "children-container";
    tagElement.appendChild(childrenContainer);
    tag.children.forEach((child) => {
      childrenContainer.appendChild(createTagElement(child, tag));
    });
  }

  // Handle data input changes for non-root tags

  if (tag !== tree && parentTag !== null) { // Exclude root and direct children
    const dataInput = document.createElement("input");
    dataInput.className = "data-input";
    dataInput.type = "text";
    dataInput.value = tag.data || "";
    dataInput.placeholder = "Data...";
    tagElement.appendChild(dataInput);
  
    dataInput.addEventListener("input", () => {
      tag.data = dataInput.value;
      updateExport();
    });
  }
  // Handle tag name editing
  const tagNameElement = tagHeader.querySelector(".tag-name");
  const tagNameText = tag.name;

  tagNameElement.addEventListener("click", () => {
    const tagNameInput = document.createElement("input");
    tagNameInput.type = "text";
    tagNameInput.value = tag.name;
    tagNameInput.className = "tag-name-input";

    tagNameInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission
        const newName = tagNameInput.value.trim();
        if (newName) {
          renameChild(tag, newName);
          tagNameElement.textContent = newName;
        }
        tagNameInput.remove();
        tagNameElement.style.display = "inline"; // Show the tag name again
      }
    });

    tagNameElement.style.display = "none"; // Hide the tag name
    tagNameElement.insertAdjacentElement("afterend", tagNameInput);
    tagNameInput.focus();
  });

  tagNameElement.textContent = tagNameText; // Set initial tag name text

  function renameChild(tag, newName) {
    tag.name = newName;
    updateExport();
  }

  // Toggle tag collapse
  tagHeader.querySelector(".collapse-icon").addEventListener("click", () => {
    tagElement.classList.toggle("collapsed");
    tagHeader.querySelector(".collapse-icon").textContent =
      tagElement.classList.contains("collapsed") ? ">" : "v";
  });

  // Add a child to the tag

  tagHeader.querySelector(".add-child-btn").addEventListener("click", () => {
    const newChildIndex = (tag.children && tag.children.length + 1) || 1;
    const newChildName = generateChildName(tag, newChildIndex);
    const newChild = { name: newChildName, data: "Data", children: [] };
    tag.children = tag.children || [];
    tag.children.push(newChild);
    const newChildElement = createTagElement(newChild, tag);
    tagElement
      .querySelector(".children-container")
      .appendChild(newChildElement);
    updateExport();
  });

  // return tagElement;

  function generateChildName(parentTag, childIndex) {
    if (parentTag === tree) {
      return `child${childIndex}`;
    } else {
      return `${parentTag.name}-child${childIndex}`;
    }
  }

  // Delete the tag

  tagHeader.querySelector(".delete-btn").addEventListener("click", () => {
    if (parentTag) {
      const index = parentTag.children.indexOf(tag);
      if (index !== -1) {
        parentTag.children.splice(index, 1);
        tagElement.remove();
        updateExport();
      }
    }
  });

  return tagElement;
}

function addChild(parentTag) {
  const newChildIndex = (parentTag.children && parentTag.children.length + 1) || 1;
  const newChild = { name: generateChildName(parentTag, newChildIndex), data: "Data", children: [] };
  parentTag.children = parentTag.children || [];
  parentTag.children.push(newChild);

  const parentElement = document.getElementById("app");
  parentElement.innerHTML = "";
  const tagView = createTagElement(tree, null);
  parentElement.appendChild(tagView);
  updateExport();
}


function createNewChild(tag, index) {
  const newName = `${tag.name}-child${index}`;
  return { name: newName, data: "Data", children: [] };
}
// Toggle between light and dark mode

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  updateExport(); // Update export link when toggling modes
}
// Initialize the application

function initApp() {
  const appElement = document.getElementById("app");
  const tagView = createTagElement(tree, null);
  appElement.appendChild(tagView);
  updateExport();

  //10 . Dark Mode: Provide a toggle for users to switch between light and dark themes --> // Event listener for dark mode toggle button

  const darkModeToggle = document.getElementById("dark-mode-toggle");
  darkModeToggle.addEventListener("click", toggleDarkMode);
}

// Adding a child to a given parent tag

function addChild(parentTag) {
  const newChild = { name: "Child2-child1", data: "Data" };
  if (!parentTag.children) {
    parentTag.children = [];
  }
  parentTag.children.push(newChild);

  const parentElement = document.getElementById("app");
  parentElement.innerHTML = "";
  const tagView = createTagElement(tree, null);
  parentElement.appendChild(tagView);
}

initApp();

// Add Child to child2

const child2Tag = tree.children.find((tag) => tag.name === "child2");
if (child2Tag) {
  addChild(child2Tag);
}

document.getElementById("export-button").addEventListener("click", () => {
  const jsonString = JSON.stringify(tree);
  const modal = document.querySelector(".modal"); // Find the existing modal

  if (modal) {
    modal.remove(); // Remove the existing modal
  }

  const newModal = document.createElement("div");
  newModal.className = "modal";

  const preElement = document.createElement("pre");
  preElement.style.whiteSpace = "pre-wrap";
  preElement.textContent = jsonString;
  newModal.appendChild(preElement);

  document.body.appendChild(newModal); // Add the new modal
});

// Function to search for a tag by name or data

function searchTag(query, parentTag = tree) {
  if (
    parentTag.name.includes(query) ||
    (parentTag.data && parentTag.data.includes(query))
  ) {
    return parentTag;
  }
  if (parentTag.children) {
    for (const childTag of parentTag.children) {
      const foundTag = searchTag(query, childTag);
      if (foundTag) {
        return foundTag;
      }
    }
  }
  return null;
}

// Event listener for search input
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();
  const foundTag = searchTag(query);
  if (foundTag) {
    clearHighlights();
    highlightTag(foundTag);
  } else {
    clearHighlights();
  }
});

// Function to highlight the found tag
function highlightTag(tag) {
  const tagElement = findTagElement(tag);
  if (tagElement) {
    tagElement.classList.add("highlighted");
  }
}

// Function to clear tag highlights
function clearHighlights() {
  const highlightedTags = document.querySelectorAll(".highlighted");
  highlightedTags.forEach((tagElement) => {
    tagElement.classList.remove("highlighted");
  });
}

// Function to find the corresponding DOM element for a tag
function findTagElement(tag) {
  return findTagElementRecursive(tag, document.getElementById("app"));
}

function findTagElementRecursive(tag, parentElement) {
  const tagElements = parentElement.getElementsByClassName("tag");
  for (const tagElement of tagElements) {
    const tagNameElement = tagElement.querySelector(".tag-name");
    if (tagNameElement.textContent === tag.name) {
      return tagElement;
    }
  }
  for (const tagElement of tagElements) {
    const childrenContainer = tagElement.querySelector(".children-container");
    if (childrenContainer) {
      const foundTagElement = findTagElementRecursive(tag, childrenContainer);
      if (foundTagElement) {
        return foundTagElement;
      }
    }
  }
  return null;
}

const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  const foundTag = searchTag(query);
  if (foundTag) {
    clearHighlights();
    highlightTag(foundTag);
  } else {
    clearHighlights();
  }
});

// Event listener for search input losing focus (blur)
function highlightTag(tag) {
  if (tag !== tree) {
    const tagElement = findTagElement(tag);
    if (tagElement) {
      tagElement.classList.add("highlighted");
    }
  }
}

searchInput.addEventListener("blur", () => {
  if (searchInput.value.trim() === "") {
    clearHighlights();
  }
});

// Event listener for search button
searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  const foundTag = searchTag(query);
  if (foundTag) {
    clearHighlights();
    highlightTag(foundTag);
  } else {
    clearHighlights();
  }
});

function clearHighlights() {
  const highlightedTags = document.querySelectorAll(".highlighted");
  highlightedTags.forEach((tagElement) => {
    tagElement.classList.remove("highlighted");
  });
}

// Inside createTagElement function
tagElement.dataset.index = parentTag.children.indexOf(tag);

function getParentTagByIndex(index, parentTag = tree) {
  if (index < parentTag.children.length) {
    return parentTag;
  }

  for (const childTag of parentTag.children) {
    const foundParent = getParentTagByIndex(
      index - childTag.children.length - 1,
      childTag
    );
    if (foundParent) {
      return foundParent;
    }
  }

  return null;
}
