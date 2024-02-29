import bcrypt from "bcrypt";

export const hashedPassword = async(password) => {
    try{
        const rounds = 10;
        const hashedPassword = await bcrypt.hash(password,rounds);
        return hashedPassword;
    }
    catch(error){
        console.log(error);
    }
};

export const comparePassword = async (password,hashedPassword) => {
    try{
        return bcrypt.compare(password,hashedPassword);
    }catch(error){
        console.log(error);
    }
}