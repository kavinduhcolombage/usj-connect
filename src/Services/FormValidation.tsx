const signupValidation=(name: string, value:string) => {
    switch (name){
        case "name":
            if(value.length===0) return "name is required"
            return "";
        case "email":
            if(value.length===0) return "email is required"
            if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) return "Invalid email address"
            return "";
        case "password":
            if(value.length===0) return "password is required"
            if(value.length<8) return "password must be at least 8 characters long"
            if(!/[A-Z]/.test(value)) return "password must contain at least one uppercase letter"
            if(!/[a-z]/.test(value)) return "password must contain at least one lowercase letter"
            if(!/[0-9]/.test(value)) return "password must contain at least one number"
            if(!/[!@#$%^&*]/.test(value)) return "password must contain at least one special character"
            return "";
        default:
            return "";

    }
}

const loginValidation=(name: string, value:string)=>{
    switch (name){
        case "email":
            if(value.length===0) return "email is required"
            return "";
        case "password":
            if(value.length===0) return "password is required"
            return "";
        default:
            return "";

    }
}

export {signupValidation , loginValidation};