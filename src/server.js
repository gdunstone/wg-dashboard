const dataManager = require("./dataManager");
const httpServer = require("./httpServer");
const wireguardHelper = require("./wgHelper");

function main() {
	dataManager.loadServerConfig((err, server_config) => {
		if (err) {
			console.error("could not load server config", err);
			return;
		}

		const state = {
			config: {
				port: server_config.webserver_port || 3000,
				devLogs: false
			},
			server_config: null
		};

		state.server_config = server_config;

		wireguardHelper.checkServerKeys(state, state => {
			httpServer.initServer(state, () => {
				dataManager.saveWireguardConfig(state.server_config, err => {
					if (err) {
						console.log("COULD_NOT_SAVE_WIREGUARD_CONFIG");
						return;
					}

					wireguardHelper.startWireguard(err => {
						if (err) {							
							console.log("COULD_NOT_START_WIREGUARD");
							return;
						}
						console.log(
							`WireGuard-Dashboard listening on port ${
								state.config.port
							}!`
						);
					});
				});
				
			});
		});
	});
}

main();
