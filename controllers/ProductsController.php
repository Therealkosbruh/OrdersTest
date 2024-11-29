<?php

namespace app\controllers;
use yii\rest\Controller;
use app\models\Product;
use Yii;
class ProductsController extends \yii\web\Controller
{

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::class,
        ];

        return $behaviors;
    }

        /**
     * Getting product list
     * @return array
     */

public function actionIndex()
{
    try {
        $products = Product::find()->asArray()->all();
        \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        return [
            'data' => $products,
        ];
    } catch (\Exception $e) {
        return [
            'status' => 'error',
            'message' => $e->getMessage(),
        ];
    }
}


}
