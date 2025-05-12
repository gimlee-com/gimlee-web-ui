# README #

## Summary ##

### Tech stack ###
ES6, [React](https://github.com/facebook/react)
and [Redux](https://github.com/reactjs/redux),
[UIKit](https://github.com/uikit/uikit) for the UIs 
and [SASS](https://github.com/sass/sass) for styling.

**IMPORTANT!**
Use node 12.x if you want to successfully build the project.
All the dependencies are dated; feel free to try to update it all (if you are up for a
complete project rewrite).

## Running the project and building production package[s] ##
First, run `npm install` to install all the dependencies.
Note: the `sass` library requires node-gyp.
node-gyp requires python 2.7 and .NET Framework 2.0 (on Windows). An easy step to set these
deps up on a Windows machine is to exec `npm install -g --production windows-build-tools`
(as an admin).

The code allows building different applications with various branding/themes, so the next step is to choose which
application and which brand (style), you'd like to run/build.
As of now the only available application is `gimlee` and the only "brand" is `default`

execute followind commands:
* `npm run app:gimlee`
* `npm run brand:gimlee-default`

### Runninng the project in dev mode ###
Run `npm start` to run mock server and both desktop and mobile clients
in development mode.
You can now go to either:
 * http://localhost:8080 
 * http://localhost:8181/mobile.html
 
This will open up an application that connects to the [gimlee-api backend](https://github.com/gimlee-com/gimlee-backend/tree/master/gimlee-api)

(you can also check out the `mock-server` directory to see what kind of features it offers
and what features it is missing - the mock-server development is being neglected due to the preference of running
the whole back-end locally)

### Building production package ###
Run `npm run build` to build desktop and mobile packages
or
run `npm run build:desktop` or `npm run build:mobile` to run builds separately
for each platform.

Then serve `dist` folder on any static server.

### Package size analysis ###
Use `npm run startAndAnalyzeBundle` and `npm run buildAndAnalyzeBundle` commands
which open your browser and display a graph showing you sizes of each
module in the bundle. All the credit goes to
[webpack-bundle-analyze](https://github.com/th0r/webpack-bundle-analyzer).

## Branding ##
The app supports branding. It's not only limited to the styling but the functionalities as well. 

### Creating new brand ###
To add a brand called e.g. _new_brand_:
* copy contents of ```styles/default``` to ```styles/new_brand```
* edit ```styles/new_brand/*..scss``` as you like

### Setting active brand ###
* To build/run your project with _new_brand_ that you have just created,
 set `gimlee-ui:BRAND=new_brand` config value in .npmrc
(you could also have a look at `brand:default` npm script in package.json and create
`brand:new_brand` the exact same way)
* Now you can `npm start` or `npm run build` as usual.

NOTE: By default when there's nothing in .npmrc, the default brand is `default`

## Desktop and mobile variants ##
There are two ways of checking the device type in the code:
* If some feature relies on a huge dependency, but only is specific to one kind
of device, use [preprocess](https://github.com/jsoverson/preprocess) conditions
in any js, jsx or scss file inside `/src` directory, eg.:
```javascript
/* @if DEVICE='mobile' */
console.log('hello from mobile');
/* @endif */
/* @if DEVICE='desktop' */
import someHugeDependency from 'somewhere';
console.log('hello from desktop');
/* @endif */
``` 

It's ugly, but will not increase the mobile package size when e.g. some desktop feature is heavy but not used
on mobile at all

OR

* Use global vars available across the code if you are not worried about
the impact on package size or performance:
   * `APP_TARGET_DEVICE` in .js[x] files
   eg.: 
   ```
   render() {
    return (
        <Div>
            { APP_TARGET_DEVICE === 'mobile' && <MobilePanel>Something</MobilePanel> }
            { APP_TARGET_DEVICE === 'desktop' && <DesktopPanel>Something else</DesktopPanel> }
        </Div>
    )
   }
   ```
   * `$DEVICE` in .scss files
   eg.:
   ```
        @if $DEVICE == mobile { background: red; }
        @else if $DEVICE == desktop { background: blue; }
   ```

## License ##
See LICENSE
