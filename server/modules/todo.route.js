// requires
const express = require( 'express' );
const router = express.Router();
const pool = require( './pool' );

// routes
router.get( '/', ( req, res ) => {
    console.log( 'in todo GET' );
    let query = 'SELECT * FROM tasks';
    pool.query( query ).then( (results)=>{
        console.log( 'query maybe ok?!?..?~$#*$', results.rows );
    });
    res.send( 'meow' );
}) // end GET

router.post( '/', ( req, res ) => {
    console.log( 'in todo POST', req.body );
    res.send( 'ribbet' );
}) // end POST

router.put( '/', ( req, res ) => {
    console.log( 'in todo PUT', req.query );
    res.send( 'woof' );
}) // end PUT

router.delete( '/', ( req, res ) => {
    console.log( 'in todo DELETE', req.query );
    res.send( 'moo' );
}) // end DELETE

// exports
module.exports = router;