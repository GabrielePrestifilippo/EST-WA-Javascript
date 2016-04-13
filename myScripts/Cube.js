/* global define:true*/
define([
    'src/WorldWind',

], function(
    WorldWind) {



    var Cube = function(coords, color) {


        var meshPositions = [],
            meshIndices = [];

        var x = [],
            y = [],
            z = [];

        x[0] = coords[0].lat;
        y[0] = coords[0].lng;
        x[1] = coords[3].lat;
        y[1] = coords[3].lng;
        x[2] = coords[1].lat;
        y[2] = coords[1].lng;
        x[3] = coords[2].lat;
        y[3] = coords[2].lng;

        z[0] = coords.altitude;
        z[1] = z[0] + coords.height;

        meshPositions.push(new WorldWind.Position(x[0], y[0], z[0]));
        meshPositions.push(new WorldWind.Position(x[1], y[1], z[0]));
        meshPositions.push(new WorldWind.Position(x[2], y[2], z[0]));

        meshIndices.push(0);
        meshIndices.push(1);
        meshIndices.push(2);

        meshPositions.push(new WorldWind.Position(x[3], y[3], z[0]));
        meshPositions.push(new WorldWind.Position(x[2], y[2], z[0]));
        meshPositions.push(new WorldWind.Position(x[1], y[1], z[0]));

        meshIndices.push(3);
        meshIndices.push(4);
        meshIndices.push(5);

        meshPositions.push(new WorldWind.Position(x[1], y[1], z[0]));
        meshPositions.push(new WorldWind.Position(x[1], y[1], z[1]));
        meshPositions.push(new WorldWind.Position(x[0], y[0], z[0]));

        meshIndices.push(6);
        meshIndices.push(7);
        meshIndices.push(8);

        meshPositions.push(new WorldWind.Position(x[0], y[0], z[1]));
        meshPositions.push(new WorldWind.Position(x[0], y[0], z[0]));
        meshPositions.push(new WorldWind.Position(x[1], y[1], z[1]));

        meshIndices.push(9);
        meshIndices.push(10);
        meshIndices.push(11);

        meshPositions.push(new WorldWind.Position(x[1], y[1], z[1]));
        meshPositions.push(new WorldWind.Position(x[2], y[2], z[1]));
        meshPositions.push(new WorldWind.Position(x[0], y[0], z[1]));

        meshIndices.push(12);
        meshIndices.push(13);
        meshIndices.push(14);

        meshPositions.push(new WorldWind.Position(x[1], y[1], z[1]));
        meshPositions.push(new WorldWind.Position(x[3], y[3], z[1]));
        meshPositions.push(new WorldWind.Position(x[2], y[2], z[1]));

        meshIndices.push(15);
        meshIndices.push(16);
        meshIndices.push(17);

        meshPositions.push(new WorldWind.Position(x[1], y[1], z[1]));
        meshPositions.push(new WorldWind.Position(x[3], y[3], z[1]));
        meshPositions.push(new WorldWind.Position(x[1], y[1], z[0]));

        meshIndices.push(18);
        meshIndices.push(19);
        meshIndices.push(20);

        meshPositions.push(new WorldWind.Position(x[3], y[3], z[1]));
        meshPositions.push(new WorldWind.Position(x[3], y[3], z[0]));
        meshPositions.push(new WorldWind.Position(x[1], y[1], z[0]));

        meshIndices.push(21);
        meshIndices.push(22);
        meshIndices.push(23);

        meshPositions.push(new WorldWind.Position(x[3], y[3], z[1]));
        meshPositions.push(new WorldWind.Position(x[2], y[2], z[0]));
        meshPositions.push(new WorldWind.Position(x[3], y[3], z[0]));

        meshIndices.push(24);
        meshIndices.push(25);
        meshIndices.push(26);

        meshPositions.push(new WorldWind.Position(x[3], y[3], z[1]));
        meshPositions.push(new WorldWind.Position(x[2], y[2], z[1]));
        meshPositions.push(new WorldWind.Position(x[2], y[2], z[0]));

        meshIndices.push(27);
        meshIndices.push(28);
        meshIndices.push(29);

        meshPositions.push(new WorldWind.Position(x[2], y[2], z[1]));
        meshPositions.push(new WorldWind.Position(x[2], y[2], z[0]));
        meshPositions.push(new WorldWind.Position(x[0], y[0], z[1]));

        meshIndices.push(30);
        meshIndices.push(31);
        meshIndices.push(32);

        meshPositions.push(new WorldWind.Position(x[2], y[2], z[0]));
        meshPositions.push(new WorldWind.Position(x[0], y[0], z[0]));
        meshPositions.push(new WorldWind.Position(x[0], y[0], z[1]));

        meshIndices.push(33);
        meshIndices.push(34);
        meshIndices.push(35);

        var mesh = new WorldWind.TriangleMesh(meshPositions, meshIndices, meshAttributes);
       var outlineIndices = [0, 1, 3, 4, 0, 1, 6, 7, 9, 10, 6, 7, 16, 17, 14, 12,19,22,23,18,19,28,25,26,27,28,31,34,35,30];
        mesh.outlineIndices = outlineIndices;

        var meshAttributes = new WorldWind.ShapeAttributes(null);

        if (color) {
            meshAttributes._interiorColor = color;
        }

        meshAttributes.drawOutline = false;
        meshAttributes.applyLighting = true;

        mesh.attributes = meshAttributes;
        mesh.expirationInterval=100000;
        //var highlightAttributes = new WorldWind.ShapeAttributes(meshAttributes);

       // mesh.highlightAttributes = highlightAttributes;
        mesh.point = {
            0: x[0],
            1: y[0]
        };
        return mesh;

    };
    return Cube;
});