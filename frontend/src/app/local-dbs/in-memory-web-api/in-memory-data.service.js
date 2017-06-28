"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InMemoryDataService = (function () {
    function InMemoryDataService() {
    }
    InMemoryDataService.prototype.createDb = function () {
        var users = [
            { id: 1, username: 'user', password: 'user', firstName: 'Amazing', lastName: 'User', email: 'user@awoa.com', state: 'active' },
        ];
        var images = [
            { id: 1, name: 'Bengal Fire Sparks', state: 'active', path: '/imgs/1.jpg' },
            { id: 2, name: 'Colorful Bokeh', state: 'active', path: '/imgs/2.jpg' },
            { id: 3, name: 'Kettle Fire Stones', state: 'active', path: '/imgs/3.jpg' },
            { id: 4, name: 'Green Parrot', state: 'active', path: '/imgs/4.jpg' },
            { id: 5, name: 'Rubiks Cube', state: 'active', path: '/imgs/5.jpg' },
            { id: 6, name: 'Skateboard', state: 'active', path: '/imgs/6.jpg' }
        ];
        return { users: users, images: images };
    };
    return InMemoryDataService;
}());
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.service.js.map