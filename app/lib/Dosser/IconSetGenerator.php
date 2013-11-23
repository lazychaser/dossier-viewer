<?php namespace Dosser;

use Illuminate\Filesystem\Filesystem;

class IconSetGenerator {
    
    protected $file;

    protected $icons;

    protected $columns;

    protected $width;

    protected $height;

    public function __construct(Filesystem $file)
    {
        $this->file = $file;
    }

    public function load($path)
    {
        $files = $this->file->files($path);
        $icons = array();

        $width = $height = null;

        foreach ($files as $path) 
        {
            $filename = pathinfo($path, PATHINFO_FILENAME);

            if (preg_match('/^[a-z]+-(.+?)$/', $filename, $matches))
            {
                $icon = $matches[1];
                $icons[] = compact('path', 'icon');

                $info = getimagesize($path);

                // Get the largest icon size.
                if ($width === null || $info[0] > $width)
                {
                    $width = (int)ceil($info[0]);
                    $height = (int)ceil($info[1]);
                }
            }
        }

        if (empty($icons)) return false;

        $square = count($icons) * $width * $height;

        $columns = (int)ceil(sqrt($square) / $width);

        array_walk($icons, function (&$icon, $i) use ($width, $height, $columns) {

            // Make a gap.
            ++$i;
            
            $icon['x'] = $width * ($i % $columns);
            $icon['y'] = $height * (int)($i / $columns);
        });

        $this->icons = $icons;
        $this->columns = $columns;
        $this->width = $width;
        $this->height = $height;

        return true;
    }

    public function image($path)
    {
        $width = $this->width * $this->columns;
        $height = $this->height * ceil((float)count($this->icons) / $this->columns);

        $out = imagecreatetruecolor($width, $height);
        
        imagealphablending($out, false);
        imagesavealpha($out, true);

        imagefill($out, 0, 0, 0x7fffffff);

        foreach ($this->icons as $icon) 
        {
            $iconImage = imagecreatefrompng($icon['path']);

            imagealphablending($iconImage, false);

            $width = imagesx($iconImage);
            $height = imagesy($iconImage);
            $x = 0;

            if ($width < $this->width)
            {
                $x = ($this->width - $width) / 2;
            }

            imagecopy($out, $iconImage, $icon['x'] + (int)$x, $icon['y'], 0, 0, $width, $height);

            imagedestroy($iconImage);
        }

        // imagealphablending($out, false);
        // 

        $result = @imagepng($out, $path);

        imagedestroy($out);

        return $result;
    }

    public function css($baseClass)
    {
        $out = ".$baseClass{width:{$this->width}px;height:{$this->height}px;}\n";

        foreach ($this->icons as $icon) 
        {
            $out .= ".$baseClass-{$icon['icon']}{";
            $out .= "background-position:-{$icon['x']}px -{$icon['y']}px;";
            $out .= "}\n";
        }

        return $out;
    }
}