import db from "../models/index";



let checkBrandsname = (name) => {
    return new Promise(async(resolve, reject) => {
        try {
            let Brand = await db.Brand.findOne({

                where: { name: name },

            });
            if (Brand) {
                resolve(true);
            } else {
                resolve(false);
            }

        } catch (e) {
            reject(e);

        }
    })
}
let CreateBrands = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            // check taikhoan is exist??
            let check = await checkBrandsname(data.name);
            if (check == true) {
                resolve({
                    errcode: 1,
                    errMessage: "Tên loại sản phẩm này đã tồn tại"
                })
            } else {
                await db.Brand.create({
                    name: data.name,
                    image: data.avatar

                });
                if (data && data.image) {
                    data.image = Buffer.from(data.image, 'base64').toString('binary');

                }
                if (!data) {
                    data = {};
                }
                resolve({
                    errcode: 0,
                    data: data
                })

                resolve({
                    errcode: 0,
                    message: 'OK'
                })
            }



        } catch (e) {
            reject(e);

        }
    })
}
let deleteBrands = (BrandsId) => {
    return new Promise(async(resolve, reject) => {
        let category = await db.Brand.findOne({
            where: { id: BrandsId }
        })
        if (!category) {
            resolve({
                errcode: 2,
                errMessage: "loại sản phẩm  không tồn tại"
            })
        }
        await db.Brand.destroy({
            where: { id: BrandsId }
        });
        resolve({
            errcode: 0,
            errMessage: "loại sản phẩm đã bị xóa !"

        });
    })
}




let updateBrandsData = (data) => {
    return new Promise(async(resolve, reject) => {
        try {

            if (!data.id) {
                resolve({
                    errcode: 2,
                    errMessage: "Missing required parameter"
                })
            }
            let Brand = await db.Brand.findOne({
                where: { id: data.id },
                raw: false
            })
            if (Brand) {
                Brand.name = data.name;
                if (data.avatar) {
                    Brand.image = data.avatar;

                }

                Brand.image = data.avatar;



                await Brand.save();
                resolve({
                    errcode: 0,
                    errMessage: "update Brand succeeds !"
                });
            } else {
                resolve({
                    errcode: 1,
                    errMessage: "Brand not found !"
                });
            }
        } catch (e) {
            reject(e)

        }
    })
}


let getAllBrands = (BrandsId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let Brand = '';
            if (BrandsId == 'ALL') {
                Brand = db.Brand.findAll({
                    order: [
                        ["createdAt", "DESC"]
                    ],
                })

            }
            if (BrandsId && BrandsId !== 'ALL') {
                Brand = await db.Brand.findOne({
                    where: { id: BrandsId }, //  productId laf cais tham so truyen vao
                });

            }
            resolve(Brand)
        } catch (e) {
            reject(e);
        }
    })

}

module.exports = {
    getAllBrands: getAllBrands,
    CreateBrands: CreateBrands,
    deleteBrands: deleteBrands,
    updateBrandsData: updateBrandsData,

}