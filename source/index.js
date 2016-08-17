import Rcon from 'rcon';

let client = new Rcon('server', 1234, 'password');

client.on('response', (response) => {
	parse(response, 'There are', () => {
		let list = response.split(':');
		let names = list[1].split(', ');
		names = names.map((item) => {
			let split = item.split(' ');
			let name = split[0];
			let uuid = split[1].substring(1, split[1].length - 1);
			return [name, uuid];
		});

		update('online', names);
	});
});

client.on('end', () => {
	console.log('closed');
});

client.on('auth', () => {
	console.log('Authenticated!');
	client.send('list uuids');
	setInterval(() => {
		client.send('list uuids');
	}, 1000);
});

client.connect();

const parse = (string, pattern, callback) => {
	if (string.indexOf(pattern) !== -1) {
		return callback();
	}
};

let _state = {};

const update = (type, data) => {
	switch (type) {
		case 'online':
			console.log(data);
		break;
		default:
			console.log('unknown type');
	}
};
