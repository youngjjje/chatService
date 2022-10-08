const jwt = require('jsonwebtoken');

const secretKey = '655368566D597133743677397A244326452948404D635166546A576E5A723475';
const options = {
  expiresIn: '2h', // 만료시간
};

const tokenUtil = {
  // 토큰 생성
  makeToken(user) {
    const payload = {
      id: user.id,
      userid: user.userid,
      name: user.name,
    };

    const token = jwt.sign(payload, secretKey, options);
    return token;
  },
  // 토큰 검증
  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, secretKey);

      return decoded;
    } catch (err) {
      return null;
    }
  },
};

module.exports = tokenUtil;
