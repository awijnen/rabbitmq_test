var amqp = require('amqplib');
var when = require('when');

amqp.connect('amqps://fotoposter:heTSBqJx@rabbit.cybertu.be:5671').then(function(conn) {
 return when(conn.createChannel().then(function(ch) {
   var ex = 'fotoposter.fanout';

   var message = process.argv.slice(2).join(' ') ||
     'info: Hello World!';

   ch.publish(ex, '', new Buffer(message));
   console.log(" [x] Sent '%s'", message);
   return ch.close();
 })).ensure(function() { conn.close(); });
}).then(null, console.warn);