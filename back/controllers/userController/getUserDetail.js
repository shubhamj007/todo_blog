const User = require('../../models').users;
const Section = require('../../models').sections;
const CustomField = require('../../models').custom_fields;
const FormDefaultFields = require('../../models').form_default_fields;

const authService = require('./../../services/AuthService');

const getUserDetail = async function (req, res) {

    let sections, err, countries;

    [err, data] = await to(User.findOne({
        where: {
            id: req.user.id,
            is_deleted: '0'
        }
    }));

    if (data) {

        const userData = data.dataValues;
        if (userData.birth_date) {
            const d = new Date(userData.birth_date);
            userData.birth_date = {
                day: d.getDate(),
                month: d.getMonth() + 1,
                year: d.getFullYear()
            };
        }

        [err, sections] = await to(
            Section.findAll({
                where : {
                    type : 'USER'
                },
                include: [{
                    model: CustomField,
                    as: 'custom_fields'
                }], 
                order: [
                    ['priority_order','ASC']
                ]
            }).map(el => el.get({ plain: true }))
        );
        
        for (let section of sections) {
            let fieldSizeCount = 0;

            for (let custom_field of section.custom_fields) {
                
                if(!custom_field.is_hidden)
                    fieldSizeCount = fieldSizeCount + custom_field.field_size; 
                
                if( (custom_field.control_type == "dropdown" || custom_field.control_type == "radio" || custom_field.control_type == "checkbox") && custom_field.additional_attribute ){
                    custom_field.additional_attribute = Object.values(JSON.parse(custom_field.additional_attribute));
                }else if( custom_field.control_type == "countryDropdown" ){
                   custom_field.additional_attribute = ''; 
                }
            }
            
            section.custom_fields.sort(function(a, b){
                return a.order - b.order
            })
        };
        
        if(err){
            return ReE(res, err);
        }

        //return res.json({ success: true, message: 'folders recieved', data: data });
        return ReS(res, { data: data, section: sections, message: "user recieved successfully" }, 200);
    }
}
module.exports.getUserDetail = getUserDetail;
