import {Editor, MarkdownView, Notice, Plugin, TFile} from 'obsidian';
import {DEFAULT_SETTINGS, MyPluginSettings, SampleSettingTab} from "./settings";

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();

		this.addRibbonIcon('plus-circle', 'Append template section', async () => {
			await this.appendTemplateSection();
		});

		this.addCommand({
			id: 'append-template-section',
			name: 'Append template section to current note',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				await this.appendTemplateSection();
			}
		});

		this.addSettingTab(new SampleSettingTab(this.app, this));
	}

	onunload() {
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData() as Partial<MyPluginSettings>);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async appendTemplateSection(): Promise<void> {
		try {
			const view = this.app.workspace.getActiveViewOfType(MarkdownView);
			if (!view) {
				new Notice('No active note. Open a note first.');
				return;
			}
			const editor = view.editor;

			const templatePath = this.settings.templateFilePath;
			const abstractFile = this.app.vault.getAbstractFileByPath(templatePath);
			if (!abstractFile || !(abstractFile instanceof TFile)) {
				new Notice(`Template file not found: "${templatePath}"`);
				return;
			}

			const templateContent = await this.app.vault.read(abstractFile);
			const sep = this.settings.sectionSeparator || '---';
			const section = this.extractSection(templateContent, sep);
			if (section === null) {
				new Notice(`Could not find a "${sep}" block in the template file.`);
				return;
			}

			const newContent = editor.getValue().trimEnd() + '\n\n' + section;
			editor.setValue(newContent);
			new Notice('Template section appended.');
		} catch (e) {
			new Notice('Failed: ' + (e instanceof Error ? e.message : String(e)));
			console.error(e);
		}
	}

	extractSection(templateContent: string, separator: string): string | null {
		const escapedSep = separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
		const pattern = new RegExp(`^${escapedSep}\\s*$`, 'm');
		const parts = templateContent.split(pattern);
		// parts[0] = before first separator, parts[1] = section body, parts[2] = after last separator
		if (parts.length < 3) return null;
		return parts[1] + separator;
	}
}
