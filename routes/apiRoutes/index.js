    // add router
const router = require( 'express' ).Router();
    // reference to database
const db = require( '../../db/db.json' );
    // requrie fs
const fs = require("fs");
    // require path
const path = require("path")
    // validate module
const validate = require('../../utils/validate');
    // unique id generator
const unique = require( 'uniqid' );

    // get route
router.get( '/', ( req, res ) => {
    let results = db
    res.json( results )
});

    // post note route
router.post( '/', ( req, res ) => {
        // define content
    const entry = req.body;    
        // check entry is not null, and not empty
    if( !validate( entry ) ) {
            // error if not validated
        res.status( 400 ).send( 'The note must not be empty' );
        return;
    } else {
            // add unique id
        entry.id = unique()
            // push entry into db
        db.push( entry )
            // write file
        fs.writeFileSync(
            path.join( __dirname, '../../db/db.json' ),
            JSON.stringify( db, null, 1 )
        )
            // responsd with db json
        res.json(db)
    }
})

    // notes delete route
router.delete( '/*', ( req, res ) => {
        // create object of request params and get values
    var id = Object.values(req.params)[0]
        // splice from array where id matches
    db.splice(db.findIndex( line => line.id === id), 1)
        // write file
    fs.writeFileSync(
        path.join( __dirname, '../../db/db.json' ),
        JSON.stringify( db, null, 1 )
    )
        // responsd with db json
    res.json(db)
});

    // export
module.exports = router;