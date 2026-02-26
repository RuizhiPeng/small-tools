# Daily Note Section Appender

An Obsidian plugin that adds a button to quickly append a fresh template section to your current daily note.

## What it does

When you're editing a daily note and want to log another entry, click the **`+` circle icon** in the left ribbon (or run the command from the Command Palette). The plugin reads your template file and appends a blank copy of its content block to the bottom of the active note.

**Daily note template:**
```
---
# #project_

#####  What I did

* xxxxx

##### Questions
* xxxxxx

##### To do
- [ ] 

---
```

**Before:**
```
---

# #project

#####  What I did

* We meet

---
```

**After clicking the button:**
```
---

# #pregnancy

#####  What I did

* We meet

---

# #project_

#####  What I did

* xxxxx

##### Questions
* xxxxxx

##### To do
- [ ]



---
```

## Installation

### Option A — Build from source

1. Clone the repository and enter the folder:
   ```bash
   git clone https://github.com/RuizhiPeng/small-tools
   cd small-tools
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the plugin:
   ```bash
   npm run build
   ```
4. Copy `main.js`, `manifest.json`, and `styles.css` into your vault (create the sample plugin folder first):
   ```
   <vault>/.obsidian/plugins/sample-plugin/
   ```
5. Open Obsidian → Settings → Community Plugins → enable **Daily Note Section Appender**.



## Configuration

Go to Settings → Daily Note Section Appender to configure the following options:

| Setting | Default | Description |
|---|---|---|
| Template file path | `a_template/daily note template.md` | Vault-relative path to your template file |
| Section separator | `---` | Delimiter used to wrap sections in the template file |

Your template file should contain a section wrapped between two separators (default `---`):

```
---
# #project_

#####  What I did

* xxxxx

##### Questions
* xxxxxx

##### To do
- [ ]

---
```

You can change the separator to any string (e.g. `***` or `===`) as long as it appears on its own line and matches what you use in the template file.

## Usage

- **Ribbon button**: click the `+` circle icon in the left sidebar while a note is open.
- **Command Palette**: press `Ctrl+P` and search for "Append template section to current note".
- You can also assign a custom hotkey to the command in Settings → Hotkeys.

## Support

If you find this plugin useful, consider buying me a coffee:

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-support-yellow)](https://buymeacoffee.com/rzpeng96)
