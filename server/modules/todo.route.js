// requires
const express = require( 'express' );
const router = express.Router();
const pool = require( './pool' );

// routes
router.get( '/', ( req, res ) => {
    console.log( 'in todo GET' );
    let query = 'SELECT * FROM tasks';
    pool.query( query ).then( (results)=>{
        res.send( results.rows );
    }).catch( (err)=>{
        console.log( 'error reading from db:', err );
        res.sendStatus( 400 );
    })
}) // end GET

router.post( '/', ( req, res ) => {
    console.log( 'in todo POST', req.body );
    let query = 'INSERT INTO tasks ("task") VALUES ($1)';
    pool.query( query, [ req.body.task ]).then( ( results )=>{
        console.log( 'added 2 db' );
        res.sendStatus( 200 );
    }).catch( (err)=>{
        console.log( 'ERROR ADDING TO DB:', err );
        res.sendStatus( 400 );
    })
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