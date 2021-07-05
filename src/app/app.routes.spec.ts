import { TestBed } from "@angular/core/testing"
import { routes } from "./app.routes"
import { UsersComponent } from "./users/users.component"

describe('checking routes defined or not',()=>{
    it('should contain a route for /users',()=>{
        expect(routes).toContain({path:'users',component:UsersComponent})
    })

    
})