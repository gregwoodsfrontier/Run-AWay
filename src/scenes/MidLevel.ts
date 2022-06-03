
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import PSD from "../prefabs/PSD";
import Rock from "../prefabs/Rock";
import PlayerContainer from "../prefabs/PlayerContainer";
import BlastTrapContainer from "../prefabs/BlastTrapContainer";
/* START-USER-IMPORTS */
import KeyboardInput from "../components/KeyboardInput";
/* END-USER-IMPORTS */

export default class MidLevel extends Phaser.Scene {

	constructor() {
		super("MidLevel");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// mid_level
		const mid_level = this.add.tilemap("mid level");
		mid_level.addTilesetImage("gamedevjs-cave-tileset-1", "cave-test-tileset-1");

		// floor_1
		mid_level.createLayer("floor", ["gamedevjs-cave-tileset-1"], 0, -5760);

		// wall_1
		mid_level.createLayer("wall", ["gamedevjs-cave-tileset-1"], 0, -5760);

		// endTunnel
		this.add.image(159, -5719, "EndTunnel");

		// pSDRobot
		const pSDRobot = new PSD(this, 413, 476);
		this.add.existing(pSDRobot);

		// rock
		const rock = new Rock(this, 80, -368);
		this.add.existing(rock);

		// rock_1
		const rock_1 = new Rock(this, 112, -432);
		this.add.existing(rock_1);

		// rock_2
		const rock_2 = new Rock(this, 144, -464);
		this.add.existing(rock_2);

		// rock_3
		const rock_3 = new Rock(this, 208, -400);
		this.add.existing(rock_3);

		// rock_4
		const rock_4 = new Rock(this, 112, -512);
		this.add.existing(rock_4);

		// rock_5
		const rock_5 = new Rock(this, 160, -512);
		this.add.existing(rock_5);

		// rock_6
		const rock_6 = new Rock(this, 96, -560);
		this.add.existing(rock_6);

		// rock_7
		const rock_7 = new Rock(this, 76.66434427757537, 387.75368330642016);
		this.add.existing(rock_7);

		// rock_8
		const rock_8 = new Rock(this, 210.74613771753516, 279.79171975736165);
		this.add.existing(rock_8);

		// rock_9
		const rock_9 = new Rock(this, 136.73922284096292, 215.30923729669465);
		this.add.existing(rock_9);

		// rock_10
		const rock_10 = new Rock(this, 149.76404961755327, 289.5543301174974);
		this.add.existing(rock_10);

		// rock_11
		const rock_11 = new Rock(this, 231, 357);
		this.add.existing(rock_11);

		// rock_12
		const rock_12 = new Rock(this, 232, 44);
		this.add.existing(rock_12);

		// rock_13
		const rock_13 = new Rock(this, 158, 82);
		this.add.existing(rock_13);

		// rock_14
		const rock_14 = new Rock(this, 138, -98);
		this.add.existing(rock_14);

		// rock_15
		const rock_15 = new Rock(this, 212, -33);
		this.add.existing(rock_15);

		// rock_16
		const rock_16 = new Rock(this, 78, 75);
		this.add.existing(rock_16);

		// rock_17
		const rock_17 = new Rock(this, 94, -2);
		this.add.existing(rock_17);

		// rock_18
		const rock_18 = new Rock(this, 194, 125);
		this.add.existing(rock_18);

		// rock_19
		const rock_19 = new Rock(this, 118, 45);
		this.add.existing(rock_19);

		// rock_20
		const rock_20 = new Rock(this, 240, 127);
		this.add.existing(rock_20);

		// rock_21
		const rock_21 = new Rock(this, 189, 174);
		this.add.existing(rock_21);

		// rock_22
		const rock_22 = new Rock(this, 116, 124);
		this.add.existing(rock_22);

		// rock_23
		const rock_23 = new Rock(this, 87, 195);
		this.add.existing(rock_23);

		// rock_24
		const rock_24 = new Rock(this, 176, -208);
		this.add.existing(rock_24);

		// rock_25
		const rock_25 = new Rock(this, 143, -283);
		this.add.existing(rock_25);

		// rock_26
		const rock_26 = new Rock(this, 130, -357);
		this.add.existing(rock_26);

		// rock_27
		const rock_27 = new Rock(this, 204, -293);
		this.add.existing(rock_27);

		// rock_28
		const rock_28 = new Rock(this, 80, -176);
		this.add.existing(rock_28);

		// rock_29
		const rock_29 = new Rock(this, 86, -262);
		this.add.existing(rock_29);

		// rock_30
		const rock_30 = new Rock(this, 176, -240);
		this.add.existing(rock_30);

		// rock_31
		const rock_31 = new Rock(this, 110, -215);
		this.add.existing(rock_31);

		// rock_32
		const rock_32 = new Rock(this, 142, -136);
		this.add.existing(rock_32);

		// rock_33
		const rock_33 = new Rock(this, 208, -176);
		this.add.existing(rock_33);

		// rock_34
		const rock_34 = new Rock(this, 108, -136);
		this.add.existing(rock_34);

		// rock_35
		const rock_35 = new Rock(this, 79, -65);
		this.add.existing(rock_35);

		// rock_36
		const rock_36 = new Rock(this, 80, -624);
		this.add.existing(rock_36);

		// rock_37
		const rock_37 = new Rock(this, 128, -624);
		this.add.existing(rock_37);

		// rock_38
		const rock_38 = new Rock(this, 176, -624);
		this.add.existing(rock_38);

		// rock_39
		const rock_39 = new Rock(this, 224, -624);
		this.add.existing(rock_39);

		// rock_40
		const rock_40 = new Rock(this, 96, -672);
		this.add.existing(rock_40);

		// rock_41
		const rock_41 = new Rock(this, 144, -672);
		this.add.existing(rock_41);

		// rock_42
		const rock_42 = new Rock(this, 192, -672);
		this.add.existing(rock_42);

		// rock_43
		const rock_43 = new Rock(this, 240, -672);
		this.add.existing(rock_43);

		// rock_44
		const rock_44 = new Rock(this, 80, -720);
		this.add.existing(rock_44);

		// rock_45
		const rock_45 = new Rock(this, 128, -720);
		this.add.existing(rock_45);

		// rock_46
		const rock_46 = new Rock(this, 176, -720);
		this.add.existing(rock_46);

		// rock_47
		const rock_47 = new Rock(this, 224, -720);
		this.add.existing(rock_47);

		// rock_48
		const rock_48 = new Rock(this, 96, -768);
		this.add.existing(rock_48);

		// rock_49
		const rock_49 = new Rock(this, 144, -768);
		this.add.existing(rock_49);

		// rock_50
		const rock_50 = new Rock(this, 192, -768);
		this.add.existing(rock_50);

		// rock_51
		const rock_51 = new Rock(this, 240, -768);
		this.add.existing(rock_51);

		// rock_52
		const rock_52 = new Rock(this, 80, -816);
		this.add.existing(rock_52);

		// rock_53
		const rock_53 = new Rock(this, 128, -816);
		this.add.existing(rock_53);

		// rock_54
		const rock_54 = new Rock(this, 176, -816);
		this.add.existing(rock_54);

		// rock_55
		const rock_55 = new Rock(this, 224, -816);
		this.add.existing(rock_55);

		// rock_56
		const rock_56 = new Rock(this, 112, -880);
		this.add.existing(rock_56);

		// rock_57
		const rock_57 = new Rock(this, 144, -1136);
		this.add.existing(rock_57);

		// rock_58
		const rock_58 = new Rock(this, 208, -1056);
		this.add.existing(rock_58);

		// rock_59
		const rock_59 = new Rock(this, 96, -1040);
		this.add.existing(rock_59);

		// rock_60
		const rock_60 = new Rock(this, 176, -1216);
		this.add.existing(rock_60);

		// rock_61
		const rock_61 = new Rock(this, 96, -1280);
		this.add.existing(rock_61);

		// rock_62
		const rock_62 = new Rock(this, 192, -1344);
		this.add.existing(rock_62);

		// rock_63
		const rock_63 = new Rock(this, 112, -1360);
		this.add.existing(rock_63);

		// rock_64
		const rock_64 = new Rock(this, 224, -1136);
		this.add.existing(rock_64);

		// rock_65
		const rock_65 = new Rock(this, 112, -1488);
		this.add.existing(rock_65);

		// rock_66
		const rock_66 = new Rock(this, 192, -1664);
		this.add.existing(rock_66);

		// rock_67
		const rock_67 = new Rock(this, 224, -1728);
		this.add.existing(rock_67);

		// rock_68
		const rock_68 = new Rock(this, 240, -1584);
		this.add.existing(rock_68);

		// rock_69
		const rock_69 = new Rock(this, 192, -1904);
		this.add.existing(rock_69);

		// rock_70
		const rock_70 = new Rock(this, 208, -1792);
		this.add.existing(rock_70);

		// rock_71
		const rock_71 = new Rock(this, 192, -2192);
		this.add.existing(rock_71);

		// rock_72
		const rock_72 = new Rock(this, 176, -2304);
		this.add.existing(rock_72);

		// rock_73
		const rock_73 = new Rock(this, 224, -1984);
		this.add.existing(rock_73);

		// rock_74
		const rock_74 = new Rock(this, 208, -2128);
		this.add.existing(rock_74);

		// rock_75
		const rock_75 = new Rock(this, 176, -2064);
		this.add.existing(rock_75);

		// rock_76
		const rock_76 = new Rock(this, 80, -2448);
		this.add.existing(rock_76);

		// rock_77
		const rock_77 = new Rock(this, 112, -2512);
		this.add.existing(rock_77);

		// rock_78
		const rock_78 = new Rock(this, 128, -2368);
		this.add.existing(rock_78);

		// rock_79
		const rock_79 = new Rock(this, 80, -2688);
		this.add.existing(rock_79);

		// rock_80
		const rock_80 = new Rock(this, 96, -2576);
		this.add.existing(rock_80);

		// rock_81
		const rock_81 = new Rock(this, 112, -2176);
		this.add.existing(rock_81);

		// rock_82
		const rock_82 = new Rock(this, 176, -2896);
		this.add.existing(rock_82);

		// rock_83
		const rock_83 = new Rock(this, 208, -2960);
		this.add.existing(rock_83);

		// rock_84
		const rock_84 = new Rock(this, 224, -2816);
		this.add.existing(rock_84);

		// rock_85
		const rock_85 = new Rock(this, 176, -3136);
		this.add.existing(rock_85);

		// rock_86
		const rock_86 = new Rock(this, 192, -3024);
		this.add.existing(rock_86);

		// rock_87
		const rock_87 = new Rock(this, 208, -2624);
		this.add.existing(rock_87);

		// rock_88
		const rock_88 = new Rock(this, 192, -3552);
		this.add.existing(rock_88);

		// rock_89
		const rock_89 = new Rock(this, 224, -3616);
		this.add.existing(rock_89);

		// rock_90
		const rock_90 = new Rock(this, 240, -3472);
		this.add.existing(rock_90);

		// rock_91
		const rock_91 = new Rock(this, 192, -3792);
		this.add.existing(rock_91);

		// rock_92
		const rock_92 = new Rock(this, 208, -3680);
		this.add.existing(rock_92);

		// rock_93
		const rock_93 = new Rock(this, 224, -3280);
		this.add.existing(rock_93);

		// rock_94
		const rock_94 = new Rock(this, 96, -3712);
		this.add.existing(rock_94);

		// rock_95
		const rock_95 = new Rock(this, 96, -3568);
		this.add.existing(rock_95);

		// rock_96
		const rock_96 = new Rock(this, 112, -3840);
		this.add.existing(rock_96);

		// rock_97
		const rock_97 = new Rock(this, 96, -3952);
		this.add.existing(rock_97);

		// rock_98
		const rock_98 = new Rock(this, 144, -3632);
		this.add.existing(rock_98);

		// rock_99
		const rock_99 = new Rock(this, 128, -3776);
		this.add.existing(rock_99);

		// rock_100
		const rock_100 = new Rock(this, 176, -4128);
		this.add.existing(rock_100);

		// rock_101
		const rock_101 = new Rock(this, 208, -4192);
		this.add.existing(rock_101);

		// rock_102
		const rock_102 = new Rock(this, 224, -4048);
		this.add.existing(rock_102);

		// rock_103
		const rock_103 = new Rock(this, 176, -4368);
		this.add.existing(rock_103);

		// rock_104
		const rock_104 = new Rock(this, 192, -4256);
		this.add.existing(rock_104);

		// rock_105
		const rock_105 = new Rock(this, 176, -3984);
		this.add.existing(rock_105);

		// rock_106
		const rock_106 = new Rock(this, 128, -4624);
		this.add.existing(rock_106);

		// rock_107
		const rock_107 = new Rock(this, 160, -4688);
		this.add.existing(rock_107);

		// rock_108
		const rock_108 = new Rock(this, 176, -4544);
		this.add.existing(rock_108);

		// rock_109
		const rock_109 = new Rock(this, 128, -4864);
		this.add.existing(rock_109);

		// rock_110
		const rock_110 = new Rock(this, 144, -4752);
		this.add.existing(rock_110);

		// rock_111
		const rock_111 = new Rock(this, 128, -4480);
		this.add.existing(rock_111);

		// rock_112
		const rock_112 = new Rock(this, 176, -5056);
		this.add.existing(rock_112);

		// rock_113
		const rock_113 = new Rock(this, 112, -5120);
		this.add.existing(rock_113);

		// rock_114
		const rock_114 = new Rock(this, 224, -4976);
		this.add.existing(rock_114);

		// rock_115
		const rock_115 = new Rock(this, 128, -5280);
		this.add.existing(rock_115);

		// rock_116
		const rock_116 = new Rock(this, 144, -5184);
		this.add.existing(rock_116);

		// rock_117
		const rock_117 = new Rock(this, 176, -4912);
		this.add.existing(rock_117);

		// rock_118
		const rock_118 = new Rock(this, 176, -5424);
		this.add.existing(rock_118);

		// rock_119
		const rock_119 = new Rock(this, 208, -5488);
		this.add.existing(rock_119);

		// rock_120
		const rock_120 = new Rock(this, 224, -5344);
		this.add.existing(rock_120);

		// rock_121
		const rock_121 = new Rock(this, 112, -5568);
		this.add.existing(rock_121);

		// rock_122
		const rock_122 = new Rock(this, 192, -5552);
		this.add.existing(rock_122);

		// rock_123
		const rock_123 = new Rock(this, 176, -5280);
		this.add.existing(rock_123);

		// playerContainer
		const playerContainer = new PlayerContainer(this, 176, 480);
		this.add.existing(playerContainer);

		// blastTrapContainer
		const blastTrapContainer = new BlastTrapContainer(this, 144, 320);
		this.add.existing(blastTrapContainer);

		// blastTrapContainer_1
		const blastTrapContainer_1 = new BlastTrapContainer(this, 96, 256);
		this.add.existing(blastTrapContainer_1);

		// lists
		const rocksList = [rock_19, rock_18, rock_17, rock_16, rock_15, rock_14, rock_13, rock_12, rock_11, rock_10, rock_9, rock_8, rock_7, rock_6, rock_5, rock_4, rock_3, rock_2, rock_1, rock, rock_75, rock_74, rock_73, rock_72, rock_71, rock_70, rock_69, rock_68, rock_67, rock_66, rock_65, rock_64, rock_63, rock_62, rock_61, rock_60, rock_59, rock_58, rock_57, rock_56, rock_55, rock_54, rock_53, rock_52, rock_51, rock_50, rock_49, rock_48, rock_47, rock_46, rock_45, rock_44, rock_43, rock_42, rock_41, rock_40, rock_39, rock_38, rock_37, rock_36, rock_35, rock_34, rock_33, rock_32, rock_31, rock_30, rock_29, rock_28, rock_27, rock_26, rock_25, rock_24, rock_23, rock_22, rock_21, rock_20, rock_76, rock_77, rock_78, rock_79, rock_80, rock_81, rock_82, rock_83, rock_84, rock_85, rock_86, rock_87, rock_88, rock_93, rock_92, rock_91, rock_90, rock_89, rock_94, rock_99, rock_98, rock_97, rock_96, rock_95, rock_100, rock_105, rock_104, rock_103, rock_102, rock_101, rock_106, rock_107, rock_108, rock_109, rock_110, rock_111, rock_112, rock_117, rock_116, rock_115, rock_114, rock_113, rock_118, rock_119, rock_120, rock_121, rock_122, rock_123];

		this.pSDRobot = pSDRobot;
		this.playerContainer = playerContainer;
		this.blastTrapContainer = blastTrapContainer;
		this.blastTrapContainer_1 = blastTrapContainer_1;
		this.mid_level = mid_level;
		this.rocksList = rocksList;

		this.events.emit("scene-awake");
	}

	private pSDRobot!: PSD;
	private playerContainer!: PlayerContainer;
	private blastTrapContainer!: BlastTrapContainer;
	private blastTrapContainer_1!: BlastTrapContainer;
	private rocksList!: Rock[];

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();

		this.activatePlayer();
		
	}

	activatePlayer()
	{
		const input = KeyboardInput.getComponent(this.playerContainer)
		if(!input)
		{
			return
		}
		input.setActive(true)
	}



	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
