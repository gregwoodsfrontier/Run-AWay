// import phaser
import Phaser from "phaser"

// import block prefab
import Block from "../prefabs/Block"

// import world generation algorithm
import World from "./WorldGen";

// class for easy block generation
export default class TileGen
{
    // generate world and return list with every tile
    static GenerateWorld(scene: Phaser.Scene)
    {
        // create list of tile/block objects
        var tiles = new Array();

        // floors
        var floors = new Array();

        // blocks
        var blocks = new Array();

        // create instance of world generation object
        var world = new World();

        // generate world and get list of tiles
        var t = world.CreateWorld(Math.round(Math.random()*999));

        // iterate through list of tiles generated and add them to list of block objects
        for(var i = 0; i < t.length; i++)
        {
            // floor tile
            if(t[i].tag == 'floor')
            {
                floors.push(this.Create(t[i].x, t[i].y, 'Floor', 0, scene));
            }
            // gold
            else if(t[i].tag.slice(0, 4) == 'gold')
            {
                blocks.push(this.Create(t[i].x, t[i].y, 'GoldBlock', Math.round(Math.random()*3), scene));
            }
            // silver
            else if(t[i].tag.slice(0, 6) == 'silver')
            {
                blocks.push(this.Create(t[i].x, t[i].y, 'SilverBlock', Math.round(Math.random()*3), scene));
            }
            else if(t[i].tag.slice(0, 6) == 'copper')
            {
                blocks.push(this.Create(t[i].x, t[i].y, 'CopperBlock', Math.round(Math.random()*3), scene));
            }
            else if(t[i].tag.slice(0, 6) == 'normal')
            {
                blocks.push(this.Create(t[i].x, t[i].y, 'NormalBlock', Math.round(Math.random()*3), scene));
            }
            else if(t[i].tag.slice(0, 6) == 'border')
            {
                switch(t[i].tag)
                {
                    case 'border-right':
                        blocks.push(this.Create(t[i].x, t[i].y, 'RBorder', 0, scene));
                        break;

                    case 'border-left':
                        blocks.push(this.Create(t[i].x, t[i].y, 'LBorder', 0, scene));
                        break;

                    case 'border-bottom':
                        blocks.push(this.Create(t[i].x, t[i].y, 'BBorder', 0, scene));
                        break;

                    case 'border-bottom-right':
                        blocks.push(this.Create(t[i].x, t[i].y, 'BRBorder', 0, scene));
                        break;

                    case 'border-bottom-left':
                        blocks.push(this.Create(t[i].x, t[i].y, 'BLBorder', 0, scene));
                        break;
                }
            }
        }

        // apply them in layers so they don't overlap, like so blocks don't appear under floor tiles

        // add floor tiles
        tiles.push.apply(tiles, floors);

        // add block tiles on top
        tiles.push.apply(tiles, blocks);

        // return list of tile/block objects
        return tiles;
    }

    static Create(x: number, y: number, type: string, iteration: number, scene: Phaser.Scene)
    {
        // create block object
        var b = new Block(scene, x+16, y+16, type);

        // change the iteration type of the block
        switch(type)
        {
            case "NormalBlock":
                b.setFrame(24 + iteration);
                break;
        
            case "CopperBlock":
                b.setFrame(8 + iteration);
                break;
            
            case "SilverBlock":
                b.setFrame(0 + iteration);
                break;
            
            case "GoldBlock":
                b.setFrame(16 + iteration);
                break;
        }

        // return the block object
        return b;
    }
}