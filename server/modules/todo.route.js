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

router.put( '/:id', ( req, res ) => {
    console.log( 'in todo PUT', req.params );
    let query = `UPDATE "tasks" SET "complete" = true WHERE "id" = $1`;
    pool.query( query, [ req.params.id ] ).then( (results)=>{
        console.log( 'updated, I think... ');
        res.sendStatus( 200 );
    }).catch( (err)=>{
        console.log( 'ERROR UPDATING: ', err );
        res.sendStatus( 400 );
    })
}) // end PUT

router.delete( '/:id', ( req, res ) => {
    console.log( 'in todo DELETE', req.params );
    let query = 'DELETE FROM "tasks" WHERE "id" = $1';
    pool.query( query, [ req.params.id ] ).then( (results)=>{
        console.log( 'deleted...' );
        res.sendStatus( 200 );
    }).catch( (err)=>{
        console.log( 'error deleting:', err );
        res.sendStatus( 400 );
    })
}) // end DELETE

// exports
module.exports = router;