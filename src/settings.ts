import {App, PluginSettingTab, Setting} from "obsidian";
import MyPlugin from "./main";

export interface MyPluginSettings {
	mySetting: string;
	templateFilePath: string;
}

export const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default',
	templateFilePath: 'a_template/daily note template.md'
}

export class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Settings #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Template file path')
			.setDesc('Vault-relative path to the template file used by the "Append section" button.')
			.addText(text => text
				.setPlaceholder('a_template/daily note template.md')
				.setValue(this.plugin.settings.templateFilePath)
				.onChange(async (value) => {
					this.plugin.settings.templateFilePath = value;
					await this.plugin.saveSettings();
				}));
	}
}
