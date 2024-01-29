import db from "../models/index";



let CreateSale = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            // check taikhoan is exist??

            await db.Sale.create({
                sale_date: data.sale_date,
                quantity: data.quantity

            });
            resolve({
                errcode: 0,
                data: data
            })

            resolve({
                errcode: 0,
                message: 'OK'
            })
        } catch (e) {
            reject(e);

        }
    })
}
let deleteSale = (SaleId) => {
    return new Promise(async(resolve, reject) => {
        let sale = await db.Sale.findOne({
            where: { id: SaleId }
        })
        if (!sale) {
            resolve({
                errcode: 2,
                errMessage: "loại sản phẩm  không tồn tại"
            })
        }
        await db.Sale.destroy({
            where: { id: SaleId }
        });
        resolve({
            errcode: 0,
            errMessage: "sale sản phẩm đã bị xóa !"

        });
    })
}




let updateSaleData = (data) => {
    return new Promise(async(resolve, reject) => {
        try {

            if (!data.id) {
                resolve({
                    errcode: 2,
                    errMessage: "Missing required parameter"
                })
            }
            let Sale = await db.Sale.findOne({
                where: { id: data.id },
                raw: false
            })
            if (Sale) {


                Sale.sale_date = data.sale_date;
                Sale.quantity = data.quantity;



                await Sale.save();
                resolve({
                    errcode: 0,
                    errMessage: "update Sale succeeds !"
                });
            } else {
                resolve({
                    errcode: 1,
                    errMessage: "Sale not found !"
                });
            }
        } catch (e) {
            reject(e)

        }
    })
}


let getAllSale = (SaleId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let Sale = '';
            if (SaleId == 'ALL') {
                Sale = db.Sale.findAll({
                    order: [
                        ["createdAt", "DESC"]
                    ],
                })

            }
            if (SaleId && SaleId !== 'ALL') {
                Sale = await db.Sale.findOne({
                    where: { id: SaleId }, // 
                });

            }
            resolve(Sale)
        } catch (e) {
            reject(e);
        }
    })

}

module.exports = {
    getAllSale: getAllSale,
    CreateSale: CreateSale,
    deleteSale: deleteSale,
    updateSaleData: updateSaleData,

}