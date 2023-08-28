import {readFile,writeFile,readdir,stat,mkdir,copyFile} from 'node:fs/promises'


const readDirNew=async (path,pathNew)=>{
     
    try {
        await dirCreate(pathNew)
        const dataFiles=await readdir(path)
        
        dataFiles.forEach(async(fileName)=>{
            const path2=(path+'/'+fileName)
            const statFile=await stat(path2)
            if (statFile.isDirectory()){
                await readDirNew(path2,`${pathNew}/${fileName}`)
            }
            else {
                await copyFile(path2,`${pathNew}/${fileName}`)
            }
        })
        return true
        
    }
    catch (error) {
        console.error(error,"Возникла ошибка при чтении файла")
        return false
    }
    
}

// // чтение файла
// // readFile('./First/1.txt','utf8',(err,data)=>{
// //     if (err) throw console.log(err,"Возникла ошибка при чтении файла")
// //     console.log(data)
// // })
const dirCreate=async (nameDir)=>{
    try{
        const newDir=await mkdir(nameDir,{recursive: true})
    }
    catch (error){
        console.error(error)
        
    }
    
}
const app = async ()=> {      
    console.log(await readDirNew('./First',"./Sec"))
}
app()
