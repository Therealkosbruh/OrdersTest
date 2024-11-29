<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "products".
 *
 * @property int $product_id
 * @property string $product_name
 * @property int $product_price
 * @property string|null $img
 *
 */
class Product extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'products';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['product_name', 'product_price'], 'required'],
            [['product_price'], 'integer'],
            [['product_name', 'img'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'product_id' => 'Product ID',
            'product_name' => 'Product Name',
            'product_price' => 'Product Price',
            'img' => 'Img',
        ];
    }

    /**
     * Gets query for [[OrderProducts]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getOrderProducts()
    {
        return $this->hasMany(OrderProduct::class, ['product_id' => 'product_id']);
    }
}
