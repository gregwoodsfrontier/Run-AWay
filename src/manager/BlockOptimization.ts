import Block from "../prefabs/Block";

// optimizes block drawing with HideIrrelevant function
export default class BlockOptimizer
{
    // hides blocks that are not within 3 chunks of given x and y coordinates
    static HideIrrelevant(blocks: Block[], x: number, y: number)
    {
        // snap x and y to top of chunk
        x -= x % 640;
        y -= y % 640;

        // y up another chunk
        y -= 640;

        // width and height@
        var width = 320; // width of chunk
        var height = 1920; // height of chunk * 3

        // iterate through every block and see if it enters range
        for(var i = 0; i < blocks.length; i++)
        {
            if(blocks[i].x >= x && blocks[i].x <= x+width && blocks[i].y >= y && blocks[i].y <= y+height)
            {
                blocks[i].visible = true;
            }
            else
            {
                blocks[i].visible = false;
            }
        }

        return blocks;
    }
}