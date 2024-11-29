<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use app\models\Order;
use app\models\OrderProduct;
use yii\web\Response;
use yii\helpers\Json;

class OrderController extends Controller
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();
    
        // CORS должен быть первым
        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::class,
            'cors' => [
                'Origin' => ['http://localhost:3000'], // Ваш фронтенд URL
                'Access-Control-Allow-Credentials' => true,
                'Access-Control-Allow-Methods' => ['GET', 'POST', 'OPTIONS'],
                'Access-Control-Allow-Headers' => ['Content-Type', 'Authorization'],
                'Access-Control-Expose-Headers' => ['Authorization'],
                'Access-Control-Max-Age' => 3600,
            ],
        ];
    
        return $behaviors;
    }
    
    public function actionOptions($id = null)
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        Yii::$app->response->headers->set('Access-Control-Allow-Origin', 'http://localhost:3000');
        Yii::$app->response->headers->set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        Yii::$app->response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        Yii::$app->response->headers->set('Access-Control-Allow-Credentials', 'true');
        Yii::$app->response->headers->set('Access-Control-Max-Age', '3600');
    
        return [];
    }
    
    public function actionCreate()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $data = Yii::$app->request->getBodyParams();
    
        Yii::info('Получены данные: ' . Json::encode($data), __METHOD__);
    
        if (empty($data)) {
            return [
                'status' => 'error',
                'message' => 'Нет данных'
            ];
        }
    
        $transaction = Yii::$app->db->beginTransaction();
    
        try {
            $order = new Order();
            $order->client_name = $data['client_name'];
            $order->price = $data['total_price'];
    
            if (!$order->save()) {
                $transaction->rollBack();
                return [
                    'status' => 'error',
                    'errors' => $order->errors
                ];
            }
    
            foreach ($data['products'] as $product) {
                $orderProduct = new OrderProduct();
                $orderProduct->order_id = $order->order_id;
                $orderProduct->product_id = $product['product_id'];
                $orderProduct->price = $product['price'];
    
                if (!$orderProduct->save()) {
                    $transaction->rollBack();
                    return [
                        'status' => 'error',
                        'errors' => $orderProduct->errors
                    ];
                }
            }
    
            $transaction->commit();
    
            return [
                'status' => 'success',
                'order_id' => $order->order_id
            ];
    
        } catch (\Exception $e) {
            $transaction->rollBack();
            Yii::error('Ошибка создания заказа: ' . $e->getMessage(), __METHOD__);
            return [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
    }
    
}
