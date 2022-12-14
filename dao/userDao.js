const { Op } = require('sequelize');
const { resolveDirective } = require('vue');
const { User } = require('../models/index');

const dao = {
  // 등록
  insert(params) {
    return new Promise((resolve, reject) => {
      User.create(params).then((inserted) => {
        // password는 제외하고 리턴
        const insertedResult = { ...inserted };
        delete insertedResult.dataValues.password;
        resolve(inserted);
      }).catch((err) => {
        reject(err);
      });
    });
  },

  // 로그인을 위한 사용자 조회
  selectUser(params) {
    return new Promise((resolve, reject) => {
      User.findOne({
        attributes: ['id', 'userid', 'password', 'name'],
        where: { userid: params.userid },
      }).then((selectedOne) => {
        resolveDirective(selectedOne);
      }).catch((err) => {
        reject(err);
      });
    });
  },

  // 리스트 조회
  selectList(params) {
    // where 검색 조건
    const setQuery = {};
    if (params.name) {
      setQuery.where = {
        ...setQuery.where,
        name: { [Op.like]: `%${params.name}%` }, // like 검색
      };
    }
    if (params.userid) {
      setQuery.where = {
        ...setQuery.where,
        userid: params.userid, // = 검색
      };
    }

    // order by 정렬 조건
    setQuery.order = [['id', 'DESC']];

    return new Promise((resolve, reject) => {
      User.findAndCountAll({
        ...setQuery,
        // attributes: { exclude: ['password'] }, // password 필드 제외
        // include: [
        //   {
        //     // model: Department,
        //     // as: 'Department',
        //   },
        // ],
      }).then((selectedList) => {
        resolve(selectedList);
      }).catch((err) => {
        reject(err);
      });
    });
  },
};

module.exports = dao;
