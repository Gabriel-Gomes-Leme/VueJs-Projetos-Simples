new Vue({
	el: '#jogo',
	data: {
		running: false,
		playerLife: 100,
		monsterLife: 100,
		logs: []
	},
	methods: {
		startGame() {
			this.running = true;
			this.playerLife = 100;
			this.monsterLife = 100;
			this.logs = [];
		},
		ataque(especial) {
			this.hurt('monsterLife', 5, 9, true, 'Jogador', 'Monstro', 'player');
			if (this.monsterLife > 0) {
				this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster');
			}
		},
		hurt(atr, min, max, especial, source, target, cls) {
			const plus = especial ? 5 : 0;
			const hurt = this.getRandom(min + plus, max + plus);
			this[atr] = Math.max(this.playerLife - hurt, 0);
			this.registroLog(`${source} atingiu o ${target} com força de ${hurt}.`, cls);
		},
		curar(min, max) {
			const heal = this.getRandom(min, max);
			this.playerLife = Math.min(this.playerLife + heal, 100);
			this.registroLog(`O jogador ganhou ${heal} de vida.`, 'player');
		},
		curarAndContraataque() {
			this.curar(10, 15);
			this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster');
		},
		getRandom(min, max) {
			const value = Math.random() * (max - min) + min;
			return Math.round(value);
		},
		registroLog(text, cls) {
			this.logs.unshift({ text, cls }); // coloca o elemento na primeira posição do array
		}
	},
	computed: {
		hasResult() {
			return this.playerLife == 0 || this.monsterLife == 0;
		}
	},
	watch: {
		hasResult(value) {
			if (value) {
				this.running = false;
			}
		}
	}
});
