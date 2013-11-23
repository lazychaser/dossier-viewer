<?php

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;
use Dosser\IconSetGenerator;

class GenerateIconsCommand extends Command {

	/**
	 * The console command name.
	 *
	 * @var string
	 */
	protected $name = 'generate-icon-set';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Generate an icon set from several files.';

	protected $generator;

	/**
	 * Create a new command instance.
	 *
	 * @return void
	 */
	public function __construct(IconSetGenerator $generator)
	{
		parent::__construct();

		$this->generator = $generator;
	}

	/**
	 * Execute the console command.
	 *
	 * @return mixed
	 */
	public function fire()
	{
		if (!$this->generator->load($this->argument('path')))
		{
			$this->error('No icons found in the specified path.');

			return -1;
		}

		if (($path = $this->option('image')) && !$this->generator->image($path))
		{
			$this->error('Failed to save icon set.');

			return -2;
		}

		if ($css = $this->option('css'))
		{
			echo $this->generator->css($css);
		}
	}

	/**
	 * Get the console command arguments.
	 *
	 * @return array
	 */
	protected function getArguments()
	{
		return array(
			array('path', InputArgument::REQUIRED, 'The path to icons.'),
		);
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
				'image', 'i', 
				InputOption::VALUE_OPTIONAL, 
				'The filename to which save the resulting set.',
				null,
			),

			array(
				'css', null,
				InputOption::VALUE_OPTIONAL,
				'The base class name for generating css.',
				null,
			),
		);
	}

}
