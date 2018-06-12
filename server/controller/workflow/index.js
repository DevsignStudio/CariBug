import glob from 'glob'
import path from 'path'

export default () => {
    let allFiles = []
    glob.sync( './controller/workflow/invoker/**/*.js' ).forEach( function( file ) {
        allFiles.push({
            name: file,
            // require: require( path.resolve( file ) )
        })
    })
    return allFiles
}