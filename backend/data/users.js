import bcrypt from 'bcryptjs';

const user = [

    {
        name:'Admin User',
        email:'admin@gmail.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true,


    },

    {
        name:'Afrid Sunil',
        email:'afrid@gmail.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:false,


    }


]

export  default user;