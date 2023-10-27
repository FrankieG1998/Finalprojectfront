let token = "a8c0d70f8bc675e7a901927730c3774aa1d55532177e3796"

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
        const response = await fetch(`https://image-gallery-sgt2.onrender.com/api/images`,
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
        const response = await fetch(`https://image-gallery-sgt2.onrender.com/api/images/${id}`,
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
        const response = await fetch(`https://image-gallery-sgt2.onrender.com/api/images/${id}`,
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
