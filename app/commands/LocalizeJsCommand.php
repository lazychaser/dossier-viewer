<?php

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class LocalizeJsCommand extends Command {

	/**
	 * The console command name.
	 *
	 * @var string
	 */
	protected $name = 'localize-js';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Make language files for desired locales.';

	protected $config;

	protected $file;

	protected $lang;

	protected $template = <<<'EOT'
LOCALE="{locale}";
function trans(l, d) { 
	var i = {items}; 
	return i[l] || d || l; 
}
EOT;

	/**
	 * Create a new command instance.
	 *
	 * @return void
	 */
	public function __construct($config, $file, $lang)
	{
		parent::__construct();

		$this->config = $config;
		$this->file = $file;
		$this->lang = $lang;
	}

	/**
	 * Execute the console command.
	 *
	 * @return mixed
	 */
	public function fire()
	{
		if (array() === $locales = $this->option('locale'))
		{
			$locales = $this->config->get('app.locales');
		}

		$messages = $this->config->get('app.messages');

		foreach ($locales as $locale) 
		{
			$this->make($locale, $messages);
		}
	}

	protected function make($locale, array $messages)
	{
		$items = $this->collect($locale, $messages);

		$this->save($locale, $items);
	}

	protected function collect($locale, array $messages, $path = null)
	{
		$items = array();

		foreach ($messages as $entry => $data) 
		{
			if (is_string($data))
			{
				$entry = $data;
			}

			if ($path) $entry = $path.'.'.$entry;

			if (is_array($data))
			{
				$items += $this->collect($locale, $data, $entry);
			}
			else
			{
				$items[$entry] = $this->lang->get($entry, array(), $locale);
			}
		}

		return $items;
	}

	protected function save($locale, array $items)
	{
		$path = "public/js/lang.$locale.js";
		$replace = array(
			'{locale}' => $locale,
			'{items}' => json_encode($items),
		);
		$data = strtr($this->template, $replace);
		
		$this->file->put($path, $data);

		$this->info("Saved: $path");
	}

	/**
	 * Get the console command arguments.
	 *
	 * @return array
	 */
	protected function getArguments()
	{
		return array();
	}

	/**
	 * Get the console command options.
	 *
	 * @return array
	 */
	protected function getOptions()
	{
		return array(
			array(
				'locale', 'l', 
				InputOption::VALUE_IS_ARRAY|InputOption::VALUE_OPTIONAL, 
				'Specify for which locale to make a language file.', 
				null
			),
		);
	}

}
