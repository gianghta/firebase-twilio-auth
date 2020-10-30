exports.codeGenerator = () => {
	let randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';

	for (let i = 0; i < 6; i++) {
		result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
	}
	return result;
};
