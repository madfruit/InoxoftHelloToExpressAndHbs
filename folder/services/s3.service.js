const uuid = require('uuid').v1;
const path = require('path');
const S3 = require('aws-sdk/clients/s3');

const { configs } = require('../configs');

const bucket = new S3({
    region: configs.AWS_S3_REGION,
    accessKeyId: configs.AWS_S3_ACCESS_KEY,
    secretAccessKey: configs.AWS_S3_SECRET_KEY
});

module.exports = {
    upload: (file, itemType, itemId) => {
        const { name, data, mimeType } = file;
        const uploadPath = _fileNameBuilder(name, itemType, itemId);
        return bucket.upload({
            Bucket: configs.AWS_S3_NAME,
            Body: data,
            Key: uploadPath,
            ContentType: mimeType
        }).promise();
    }
};

function _fileNameBuilder(fileName, itemType, itemId) {
    const extension = fileName.split('.').pop();
    return path.join(itemType, itemId, `${uuid()}.${extension}`);
}
