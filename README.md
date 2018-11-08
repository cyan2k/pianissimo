# Pianissimo
pianissimo is a repository for people who want to learn to play the piano and is made with gatsby.js

Based on the content in src/data pianissimo automatically generates slugs and a nested menu based on the individual paths of the files in src/data. Further it generates a page for the generated slug that displays a sheet pdf and an audio player to listen to the displayed piece of music.

An example:

src/data contains a directory "Graded Repertoire" with the subfolder "Grade 4" which contains the files "Beethoven - Fuer Elise.pdf" and "Beethoven - Fuer Elise.mp3"

![Directory structure](https://raw.githubusercontent.com/cyan2k/gatsby_pianissimo/master/docs/winexplorer.png "Directory structure")


After building the project with gatsby the application adds "Beethoven - Fuer Elise" and its path to the sidebar menu, generates a slug and a page at the slug for displaying the pdf and embedding the audio.

![Generated Page](https://github.com/cyan2k/pianissimo/blob/master/docs/generatedpage.png?raw=true "Generated Page")


The goal of pianissimo is to provide the hobby pianist with some repertoire and methods like Bartok's Mikrokosmos with the possibility to listen to the score.

**painissimo uses summary and detail tags for building its sidebar menu. For that reason IE/Edge is not supported!**

## Visit pianissimo
[Deployment on netlify](https://pianissimo.netlify.com)

## TODO
* Actual blog and article functionality
* Supporting Unicode in filenames. Currently file and folder names have to be ASCII to be able to generate a slug based on it. Poor Béla Bartók is Bela Bartok as for now.
* Possibility to inject text into the generated pages
