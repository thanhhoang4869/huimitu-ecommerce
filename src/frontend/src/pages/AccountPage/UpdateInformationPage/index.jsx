import { DatePicker, Form, Input, PageHeader, Radio, Button } from "antd";
import { AccountContext } from "context/AccountContext";
import moment from "moment";
import React, { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import accountService from "services/account";
import swal from "sweetalert2";
import { validateMinLength, validatePhone } from "utils/validator";

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
};

const UpdateInformationPage = (props) => {
  const { account, fetchAccount } = useContext(AccountContext);
  const navigator = useNavigate();
  const { logout } = useContext(AccountContext);

  useEffect(() => {
    fetchAccount();
  }, [])

  const handleChangeInformation = async (data) => {
    try {
      const { fullname, gender, birthday, phone } = data;

      if (!(fullname && gender && birthday && phone)) {
        return swal.fire({
          text: "Vui lòng nhập tất cả thông tin",
          icon: "info",
          confirmButtonText: "OK",
        });
      }

      if (!validatePhone(phone)) {
        return swal.fire({
          title: "Error",
          text: "Vui lòng nhập số điện thoại hợp lệ",
          icon: "error",
          confirmButtonText: "OK",
        });
      }

      const response = await accountService.updateInformation({
        fullname: fullname,
        gender: gender,
        birthday: moment(birthday).format("DD/MM/YYYY"),
        phone: phone,
      });

      const { exitcode } = response.data;

      // eslint-disable-next-line default-case
      switch (exitcode) {
        case 0: {
          await swal.fire({
            title: "Success",
            text: "Đổi thông tin thành công",
            icon: "success",
            confirmButtonText: "OK",
          });
          window.location.reload();
          break;
        }
        case 103: {
          swal.fire({
            text: "Số điện thoại đã được sử dụng",
            icon: "error",
            confirmButtonText: "OK",
          });
          break;
        }
      }
    } catch (err) {
      navigator("/error");
    }
  };

  const handleChangePassword = async (data) => {
    const { password, newPassword, confirmPassword } = data;

    if (!(newPassword && confirmPassword)) {
      return swal.fire({
        text: "Vui lòng tất cả các trường",
        icon: "info",
        confirmButtonText: "OK",
      });
    }

    if (!validateMinLength(password, 6) || !validateMinLength(newPassword, 6)) {
      return swal.fire({
        text: "Mật khẩu phải từ 6 kí tự trở lên",
        icon: "error",
        confirmButtonText: "OK",
      });
    }

    if (newPassword !== confirmPassword) {
      return swal.fire({
        text: "Mật khẩu xác nhận không khớp",
        icon: "error",
        confirmButtonText: "OK",
      });
    }

    const response = await accountService.changePassword(
      password,
      newPassword,
      confirmPassword
    );
    const { exitcode } = response.data;

    // eslint-disable-next-line default-case
    switch (exitcode) {
      case 0: {
        await swal.fire({
          title: "Success",
          text: "Đổi mật khẩu thành công, vui lòng đăng nhập lại",
          icon: "success",
          confirmButtonText: "OK",
        });
        logout();
        break;
      }
      case 101: {
        swal.fire({
          text: "Mật khẩu cũ không đúng",
          icon: "error",
          confirmButtonText: "OK",
        });
        break;
      }
    }
  };

  return (
    <div>
      <PageHeader title="Đổi thông tin cơ bản" />
      <Form {...formItemLayout} onFinish={handleChangeInformation}>
        <Form.Item
          name="fullname"
          initialValue={account.fullname}
          label="Họ tên"
        >
          <Input size="large" placeholder="Nhập họ tên" />
        </Form.Item>
        <Form.Item
          name="phone"
          initialValue={account.phone}
          label="Số điện thoại"
        >
          <Input size="large" placeholder="Nhập số điện thoại" />
        </Form.Item>
        <Form.Item
          wrapperCol={{ span: 4 }}
          labelCol={{ span: 6 }}
          name="birthday"
          initialValue={moment(account.birthday || new Date(), "DD/MM/YYYY")}
          label="Ngày sinh"
        >
          <DatePicker
            style={{ width: "100%" }}
            placeholder="Chọn ngày"
            size="large"
            allowClear={false}
            format="DD/MM/YYYY"
          />
        </Form.Item>
        <Form.Item
          initialValue={account.gender}
          span={14}
          wrapperCol={{ span: 8 }}
          labelCol={{ span: 6 }}
          name="gender"
          label="Giới tính"
        >
          <Radio.Group style={{ width: "100%" }} size="large">
            <Radio value="male">Nam</Radio>
            <Radio value="female">Nữ</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <div className="d-flex justify-content-center">
            <Button size="large" type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </div>
        </Form.Item>
      </Form>
      <PageHeader title="Đổi mật khẩu" />
      <Form {...formItemLayout} onFinish={handleChangePassword}>
        <Form.Item label="Mật khẩu hiện tại" name="password">
          <Input.Password size="large" placeholder="Nhập mật khẩu" />
        </Form.Item>
        <Form.Item label="Mật khẩu mới" name="newPassword">
          <Input.Password size="large" placeholder="Nhập mật khẩu mới" />
        </Form.Item>
        <Form.Item label="Nhập lại mật khẩu mới" name="confirmPassword">
          <Input.Password
            password
            size="large"
            placeholder="Nhập lại mật khẩu mới"
          />
        </Form.Item>
        <Form.Item>
          <div className="d-flex justify-content-center">
            <Button size="large" type="primary" htmlType="submit">
              Thay đổi
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateInformationPage;
