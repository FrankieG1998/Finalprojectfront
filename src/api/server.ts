let token = "196e1d0a5341fce18ebdd73f592772e3e85d91f1a2dd2582"

export const server_calls ={
    get: async () => {
        const response = await fetch(`https://finalprojectback-dqrp.onrender.com/images`,
        {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json', 
                //'Access-Control-Allow-Origin': '*',
                'x-access-token': `Bearer ${token}`
            },
            //mode: 'cors'
        });
        if (!response.ok){
            throw new Error('Failed to fetch data');
        }
        return await response.json()
    },

    create: async(data: any = {}) =>{
        const response = await fetch(`https://finalprojectback-dqrp.onrender.com/images`,
        {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json', 
                //'Access-Control-Allow-Origin': '*',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
            //mode: 'cors'
        });
        if (!response.ok){
            throw new Error('Failed to create data');
        }
        return await response.json()
    },

    update: async(id:string, data: any = {}) =>{
        const response = await fetch(`https://finalprojectback-dqrp.onrender.com/images/${id}`,
        {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json', 
                //'Access-Control-Allow-Origin': '*',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
            //mode: 'cors'
        });
        if (!response.ok){
            throw new Error('Failed to update data');
        }
        return await response.json()
    },

    delete: async(id:string) =>{
        const response = await fetch(`https://finalprojectback-dqrp.onrender.com/images/${id}`,
        {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json', 
                'x-access-token': `Bearer ${token}`
            },
            //mode: 'cors'
        });
        if (!response.ok){
            throw new Error('Failed to delete data');
        }
        return;
    },
}
