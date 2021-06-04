/*
 * Copyright (c) 2017-2021 Felipe de Leon <fglfgl27@gmail.com>
 *
 * This file is part of PVModel <https://github.com/fgl27/PVModel>
 *
 * PVModel is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * PVModel is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with PVModel.  If not, see <https://github.com/fgl27/PVModel/blob/master/LICENSE>.
 *
 */

//Same method used by punycode to start as a API
//APISTART this line is here so release_maker can work don't remove
(function(root) {

    /** Detect free variables */
    var PVModelGlobal = typeof global === 'object' && global;
    if (PVModelGlobal.global === PVModelGlobal ||
        PVModelGlobal.window === PVModelGlobal ||
        PVModelGlobal.self === PVModelGlobal) {

        root = PVModelGlobal;

    }
    //APIMID this line is here so release_maker can work don't remove
    //APICENTER this line is here so release_maker can work don't remove

    /**
     * Define the public API
     * and all function need to be called outiside the API
     * PVModel + all functions called by java
     */
    const PVModel = {
        'mainstart': Start
    };

    /** Expose `PVModel` */
    root.PVModel = PVModel;
}(this));

PVModel.mainstart();
//If running from fs and not from internet add a timeout to prevet crash as the parsing of the file will not be defer
//window.setTimeout(PVModel.mainstart, 10000);
//APIEND this line is here so release_maker can work don't remove
