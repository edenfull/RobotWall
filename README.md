## About Robot Wall
Robot Wall is an [LED sign](http://brightledsigns.com/programmable/indoor/bs-4x16-mini) that displays [weather](http://openweathermap.org/api), date and countdown information. I wanted to have a display that would quickly tell me the information I need to know as I head out the door (without having to fumble with an app using my phone).

![alt tag](https://raw.githubusercontent.com/edenfull/RobotWall/master/img/robotwall2.JPG)
![alt tag](https://raw.githubusercontent.com/edenfull/RobotWall/master/img/robotwall.jpg)

Now I will never forget birthdays, and I know I need to bring an umbrella today! Thanks, Robot Wall! I chose the weather information (low/high) to be displayed in both Celsius and Fahrenheit since I refuse to use Fahrenheit and Andie refuses to use Celsius. :)

Robot Wall is a Node.js port of [metral's LED sign](https://github.com/metral/led_sign) and [pshved's Muni sign](https://github.com/pshved/muni-led-sign). I built this project as a way to continue building my JavaScript and Node.js skills. 

## How It Works
Using pshved's [Perl wrapper](https://github.com/pshved/muni-led-sign/blob/master/client/lowlevel.pl), the message to be displayed is converted into its corresponding glyphs of 0's/1's to inform each LED of the sign to be on/off. The glyphs are flattened into a string to be passed in as serial port data. For example, "Hello World" with each word on its own line looks like this:
```
0000000000000000000000000000000000010001000000010100000000000000000000000000000000000000000000
0000000000000000000000000000000000010001000000010100000000000000000000000000000000000000000000
0000000000000000000000000000000000010001001110010100111000000000000000000000000000000000000000
0000000000000000000000000000000000011111010001010101000100000000000000000000000000000000000000
0000000000000000000000000000000000010001011111010101000100000000000000000000000000000000000000
0000000000000000000000000000000000010001010000010101000100000000000000000000000000000000000000
0000000000000000000000000000000000010001001110010100111000000000000000000000000000000000000000
0000000000000000000000000000000000100010000000000001000001000000000000000000000000000000000000
0000000000000000000000000000000000100010000000000001000001000000000000000000000000000000000000
0000000000000000000000000000000000100010011100111001001111000000000000000000000000000000000000
0000000000000000000000000000000000101010100010100101010001000000000000000000000000000000000000
0000000000000000000000000000000000101010100010100001010001000000000000000000000000000000000000
0000000000000000000000000000000000110110100010100001010001000000000000000000000000000000000000
0000000000000000000000000000000000100010011100100001001111000000000000000000000000000000000000
```
If you squint, you can kinda see it. :)

## Installation
Fork or download a local version of this repo. In your command line:
```
cd [your RobotWall directory]
npm install
npm start
```

## Troubleshooting
* Check that you have the right driver installed for your sign:
```
system_profiler SPUSBDataType
```
* Check that lowlevel.pl is referencing the right serial port directory:
```
ls /dev/*usb*
```

## Future Work
* It might be nice in the future to build a web interface that could make it significantly easier to manage the content that is displayed on the screen.
* Storing data in a text file is a very hacky approach. I didn't need a database for such small pieces of information that didn't need to be stored for more than a few minutes, but it's definitely not good practice for a real application.

## Dedication
This code is dedicated to the love of my life, Andie, who also came up with the name for this project. Thank you for inspiring me to build technical skills while making our home a more welcoming place.

## License
The MIT License (MIT). Copyright (c) 2015 Eden Full.
