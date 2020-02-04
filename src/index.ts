import webServer from "./modules/http";

const main = async () => {
	console.log("Hello!");
	webServer.init();
};

main().catch(err => {
	console.log("Something bad happened..", err);
	process.exit(1);
});