import { model } from "mongoose";
import { BrandSchema } from '../schemas/brand-schema';

const Brand = model("brands", BrandSchema);

export class BrandModel {
  async findByName(name){
    const brand = await Brand.findOne({ name });
    return brand;
  }

  async create(brandInfo) {
    const createdNewBrand = await Brand.create(brandInfo);
    return createdNewBrand;
  }

  async update(name, newName) {
    const updatedBrand = await Brand.updateOne({name: name}, 
      {name: newName}
    );
    return updatedBrand;
  }

  async delete(name) {
    const deletedBrand = await Brand.deleteOne({name});
    return deletedBrand;
  }

  async getList() {
    const brandList = await Brand.find({});
    return brandList;
  }
  
} 

const brandModel = new BrandModel();

export { brandModel };